import argparse
import decimal
import json
import logging
import os
import tempfile

import requests
from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction
from easy_thumbnails.files import get_thumbnailer
from nameparser import HumanName

from mtlmurals.common.text import replace

from ...models import Artist
from ...models import Mural
from ...models import Organization
from ...models import Program

logger = logging.getLogger(__file__)


class Command(BaseCommand):
    """ Imports murals from Montréal Open Data's Geo-JSON export. """

    help = 'Imports murals from Montréal Open Data\'s Geo-JSON export.'

    def add_arguments(self, parser):
        parser.add_argument(
            'infile', type=argparse.FileType('r'), help='Path to the Geo-JSON file to import')

    def handle(self, *args, **options):
        self.infile = options.get('infile')
        self.json_data = json.loads(self.infile.read())

        # Imports each mural using the Geo-JSON export.
        murals_count, murals_errored_count = 0, 0
        for feature in self.json_data.get('features'):
            try:
                import_id = feature['properties']['id']
                self.stdout.write(self.style.MIGRATE_HEADING(
                    'Start importing the mural with identifier "{}"'.format(import_id)), ending='')
                self._import_mural(feature)
                self.stdout.write(self.style.SUCCESS('  [OK]'))
            except Exception as e:
                murals_errored_count += 1
                msg = 'Unable to import the mural with identifier "{0}": {1}'.format(import_id, e)
                self.stdout.write(self.style.ERROR(msg))
                logger.error(msg, exc_info=True)
            else:
                murals_count += 1

        self.stdout.write(self.style.MIGRATE_HEADING(
            '\nMurals imported: {0} / Murals errored: {1}'.format(
                murals_count, murals_errored_count,
            )))

    @transaction.atomic
    def _import_mural(self, feature):
        properties_dict = feature.get('properties')
        import_id = properties_dict['id']

        mural = Mural.objects.filter(import_id=import_id).first()
        if mural is None:
            mural = Mural(import_id=import_id)

        mural.year = int(properties_dict['annee'])
        mural.address = properties_dict['adresse']
        mural.city = 'Montréal'
        mural.country = 'Canada'
        mural.latitude = decimal.Decimal(properties_dict['latitude'])
        mural.longitude = decimal.Decimal(properties_dict['longitude'])

        # Saves the mural's image.
        image_url = properties_dict.get('image')
        if image_url:
            request = requests.get(image_url, stream=True)
            lf = tempfile.NamedTemporaryFile()
            for block in request.iter_content(1024 * 8):
                if not block:
                    break
                lf.write(block)
            mural.image.save(os.path.basename(image_url), File(lf))

        # Creates or updates the related organization.
        raw_organization = properties_dict.get('organisation')
        organization, dummy = Organization.objects.get_or_create(name=raw_organization) \
            if raw_organization else (None, False)
        mural.organization = organization

        # Creates or updates the related program.
        raw_program = properties_dict.get('programme_entente')
        program, dummy = Program.objects.get_or_create(name=raw_program) \
            if raw_program else (None, False)
        mural.program = program

        mural.save()

        # Creates or updates artists.
        raw_artists = properties_dict['artiste']
        delimited_artists = replace(raw_artists, *[(d, ',') for d in ('et', 'and')])
        artists = []
        for artist_full_name in delimited_artists.split(','):
            pname = HumanName(artist_full_name)
            artist, dummy = Artist.objects.get_or_create(lastname=pname.last, firstname=pname.first)
            artists.append(artist)
        mural.artists.clear()
        mural.artists.add(*artists)

        # Ensures the thumbnails for murals are generated at import time.
        get_thumbnailer(mural.image)['mural_search_engine_list_item']
