"""
    Mural views
    ===========

    This module defines views that will be used to browse murals.

"""

from flask import Blueprint
from flask import render_template

from .models import Mural


mural_blueprint = Blueprint('mural', __name__, url_prefix='/')


@mural_blueprint.route('/', methods=['GET', ])
def entrypoint():
    """ The main entrypoint of our murals search engine. """
    years = next(zip(*Mural.query.order_by(Mural.year).distinct().values(Mural.year)), [])
    return render_template('mural/entrypoint.html', choices_year=years)
