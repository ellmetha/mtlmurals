"""
    Common API resource serializers
    ===============================

    This module defines common serializers that can be used when defining API resources.

"""

from flask_restplus import fields


def pagination_model_factory(api_or_ns, name=None):
    """ Generates a pagination model. """
    return api_or_ns.model(name or 'A page of results', {
        'page': fields.Integer(description='Number of this page of results'),
        'per_page': fields.Integer(description='Number of items per page of results'),
        'pages': fields.Integer(description='Total number of pages'),
        'total': fields.Integer(description='Total number of results'),
    })
