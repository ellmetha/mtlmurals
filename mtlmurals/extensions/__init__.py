"""
    Extensions setup
    ================

    Extensions can be used to provide access to common resources of the application. New extension
    instantiations and initializations should be done in this package.

"""

from flask_babel import Babel
from flask_debugtoolbar import DebugToolbarExtension
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_thumbnails import Thumbnail

from . import api


db = SQLAlchemy()
migrate = Migrate()
babel = Babel()
thumb = Thumbnail()
debug_toolbar = DebugToolbarExtension()


def init_app(app):
    """ Initializes the extensions of the application. """
    for extension in (db, api, babel, thumb, ):
        extension.init_app(app)
    migrate.init_app(app, db)

    # Initializes development extensions if applicable
    if app.debug:
        for extension in (debug_toolbar, ):
            extension.init_app(app)
