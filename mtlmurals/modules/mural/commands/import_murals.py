"""
    The mural import command
    ========================

    This module defines a command that can be used to import a set of murals into the Flask
    application by using Geo-JSON exports provided by the city of Montréal.

"""

import decimal
import json
import logging
import os
import tempfile
import uuid

import click
import requests
from flask.cli import with_appcontext
from nameparser import HumanName
from werkzeug.datastructures import FileStorage

from mtlmurals.common.text import replace
from mtlmurals.extensions import thumb

from ..models import Artist
from ..models import Mural
from ..models import Organization
from ..models import Program
from ..uploadsets import mural_images


logger = logging.getLogger(__file__)


@click.command()
@click.argument('infile', type=click.File('r'))
@with_appcontext
def import_murals(infile):
    """ Imports murals from Montréal Open Data's Geo-JSON export. """
    json_data = json.loads(infile.read())

    # Imports each mural using the Geo-JSON export.
    murals_count, murals_errored_count = 0, 0
    for feature in json_data.get('features'):
        try:
            import_id = feature['properties']['id']
            click.echo(click.style(
                'Start importing the mural with identifier "{}"'.format(import_id), fg='magenta'),
                nl=False)
            _import_mural(feature)
            click.echo(click.style('  [OK]', fg='green', bold=True))
        except Exception as e:
            murals_errored_count += 1
            msg = 'Unable to import the mural with identifier "{0}": {1}'.format(import_id, e)
            click.echo(click.style(msg, fg='red'))
            logger.error(msg, exc_info=True)
        else:
            murals_count += 1

    click.echo(click.style(
        '\nMurals imported: {0} / Murals errored: {1}'.format(murals_count, murals_errored_count),
        bg='blue', fg='white', bold=True))


def _import_mural(feature):
    """ Imports a single mural. """
    properties_dict = feature.get('properties')
    import_id = properties_dict['id']

    mural = Mural.query.filter(Mural.import_id == import_id).first()
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
        if mural.image and os.path.exists(mural_images.path(mural.image)):
            os.remove(mural_images.path(mural.image))

        request = requests.get(image_url, stream=True)
        lf = tempfile.NamedTemporaryFile()
        for block in request.iter_content(1024 * 8):
            if not block:
                break
            lf.write(block)
        lf.seek(0)
        _, ext = os.path.splitext(image_url)
        filename = mural_images.save(
            FileStorage(stream=lf), name=mural.image or str(uuid.uuid4()) + ext)
        mural.image = filename

    # Creates or updates the related organization.
    raw_organization = properties_dict.get('organisation')
    organization, dummy = Organization.get_or_create(name=raw_organization) \
        if raw_organization else (None, False)
    mural.organization_id = organization.id

    # Creates or updates the related program.
    raw_program = properties_dict.get('programme_entente')
    program, dummy = Program.get_or_create(name=raw_program) \
        if raw_program else (None, False)
    mural.program_id = program.id

    mural.save()

    # Creates or updates artists.
    raw_artists = properties_dict['artiste']
    delimited_artists = replace(raw_artists, *[(d, ',') for d in ('et', 'and')])
    artists = []
    for artist_full_name in delimited_artists.split(','):
        pname = HumanName(artist_full_name)
        artist, dummy = Artist.get_or_create(lastname=pname.last, firstname=pname.first)
        artists.append(artist)
    mural.artists.clear()
    mural.artists.extend(artists)

    # Ensures the thumbnails for murals are generated at import time.
    thumb.get_thumbnail(os.path.join(mural_images.name, mural.image), '550x360')
    # resize(mural_images.path(mural.image), '550x360', fill=True, upscale=False)
