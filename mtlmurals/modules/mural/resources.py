"""
    Mural API resources
    ===================

    This module defines API resources allowing to manipulate murals through restful APIs.

"""

import os

from flask import request
from flask_restplus import Namespace
from flask_restplus import Resource
from flask_restplus import fields
from sqlalchemy import or_

from mtlmurals.common.api.parsers import pagination_arguments
from mtlmurals.common.api.serializers import pagination_model_factory
from mtlmurals.extensions import thumb

from .models import Mural
from .uploadsets import mural_images


api = Namespace('mural', description='Murals')


def _truncated_title(mural):
    title = mural.address[0].upper() + mural.address[1:]
    return title if len(title) < 40 else title + '...'


mural = api.model('Mural', {
    'id': fields.Integer,
    'title': fields.String(attribute=_truncated_title),
    'image_url': fields.String(
        attribute=lambda m: thumb.get_thumbnail(
            os.path.join(mural_images.name, m.image), '550x360')),
    'year': fields.Integer,
    'address': fields.String,
    'address_2': fields.String,
    'zip_code': fields.String,
    'city': fields.String,
    'country': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float,
})

pagination = pagination_model_factory(api)
page_of_murals = api.inherit('Page of murals', pagination, {
    'items': fields.List(fields.Nested(mural))
})

mural_list_arguments = pagination_arguments.copy()
mural_list_arguments.add_argument('year', type=int, required=False, help='Year to filter on')
mural_list_arguments.add_argument('search', required=False, help='Search query to filter on')


@api.route('/')
class MuralList(Resource):
    """ Resource allowing to manipulate lists of murals. """

    @api.expect(mural_list_arguments)
    @api.marshal_with(page_of_murals)
    def get(self):
        """ List of murals. """
        args = mural_list_arguments.parse_args(request)

        # Filters the query of murals.
        murals = Mural.query
        filter_search = args.get('search', None)
        filter_year = args.get('year', None)
        if filter_search is not None:
            filter_search = '%{}%'.format(filter_search)
            murals = murals.filter(
                or_(Mural.address.ilike(filter_search), Mural.address_2.ilike(filter_search)))
        if filter_year is not None:
            murals = murals.filter(Mural.year == filter_year)

        page = args.get('page', 1)
        per_page = args.get('per_page', 10)
        return murals.paginate(page, per_page, error_out=False)
