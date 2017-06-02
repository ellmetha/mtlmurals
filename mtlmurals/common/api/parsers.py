"""
    Common API request parsers
    ==========================

    This module defines common request parsers that can be used when defining API resources.

"""

from flask_restplus import reqparse


pagination_arguments = reqparse.RequestParser()
pagination_arguments.add_argument('page', type=int, required=False, default=1, help='Page number')
pagination_arguments.add_argument(
    'per_page', type=int, required=False, choices=[2, 10, 20, 30, 40, 50], default=10,
    help='Number of results per page {error_msg}')
