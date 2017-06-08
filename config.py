"""
    Configuration values for the mtlmurals project
    ==============================================

    This file defines configuration values for the Flask application. These configuration values are
    targetted for development, testing or production environments.
    For the full list of settings and their values, see http://flask.pocoo.org/docs/dev/config/

"""

import json
import pathlib
import os


# BASE DIRECTORIES
# ------------------------------------------------------------------------------

# Two base directories are considered for this project:
# The PROJECT_PATH corresponds to the path towards the root of this project (the root of the
# repository).
# The INSTALL_PATH corresponds to the path towards the directory where the project's repository
# is present on the filesystem.
# By default INSTALL_PATH has the same than PROJECT_PATH.

PROJECT_PATH = pathlib.Path(__file__).parents[0]
INSTALL_PATH = pathlib.Path(os.environ.get('FLASK_INSTALL_PATH')) \
    if 'FLASK_INSTALL_PATH' in os.environ else PROJECT_PATH


# ENVIRONMENT SETTINGS HANDLING
# ------------------------------------------------------------------------------

ENVSETTINGS_FILENAME = os.environ.get('ENVSETTINGS_FILENAME', '.env.json')
ENVSETTINGS_NIL = object()

# JSON-based environment module
with open(os.environ.get('ENVSETTINGS_FILEPATH') or str(INSTALL_PATH / ENVSETTINGS_FILENAME)) as f:
    secrets = json.loads(f.read())


def get_envsetting(setting, default=ENVSETTINGS_NIL, secrets=secrets):
    """ Get the environment setting variable or return explicit exception. """
    try:
        return secrets[setting]
    except KeyError:
        if default is not ENVSETTINGS_NIL:
            return default
        error_msg = f'Set the {setting} environment variable in the {ENVSETTINGS_FILENAME} file'
        raise Exception(error_msg)


# APP CONFIGURATION
# ------------------------------------------------------------------------------

class Config:
    """ Defines common configuration values. """

    DEBUG = False

    SECRET_KEY = get_envsetting('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = get_envsetting('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    UPLOADS_DEFAULT_DEST = str(INSTALL_PATH / 'media')

    THUMBNAIL_MEDIA_ROOT = UPLOADS_DEFAULT_DEST
    THUMBNAIL_MEDIA_URL = '/_uploads/'
    THUMBNAIL_MEDIA_THUMBNAIL_ROOT = str(INSTALL_PATH / 'media' / 'thumbnails')
    THUMBNAIL_MEDIA_THUMBNAIL_URL = '/_uploads/thumbnails'


# APP CONFIGURATION (DEVELOPMENT)
# ------------------------------------------------------------------------------

class DevelopmentConfig(Config):
    """ Defines configuration values for development environments. """

    DEBUG = True

    WEBPACK_DEV_SERVER_PORT = get_envsetting('WEBPACK_DEV_SERVER_PORT', 8080)  # noqa: F405
    WEBPACK_DEV_SERVER_URL = f'http://localhost:{WEBPACK_DEV_SERVER_PORT}'
    WEBPACK_DEV_SERVER_STARTED = False

    def __init__(self):
        import socket

        # Dynamically set a boolean indicating if the webpack dev server is started.
        webpack_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            webpack_sock.bind(('localhost', self.WEBPACK_DEV_SERVER_PORT))
        except socket.error as e:
            self.WEBPACK_DEV_SERVER_STARTED = (e.errno == 48 or e.errno == 98)
        webpack_sock.close()

        # Ensures that the uploads default folder is created.
        if not os.path.exists(self.UPLOADS_DEFAULT_DEST):
            os.makedirs(self.UPLOADS_DEFAULT_DEST)

        print('THIS APP IS IN DEBUG MODE. THIS MESSAGE SHOULD NOT BE SEEN IN PRODUCTION.')


# APP CONFIGURATION (TESTING)
# ------------------------------------------------------------------------------


class TestingConfig(Config):
    """ Defines configuration values for testing environments. """

    TESTING = True

    UPLOADS_DEFAULT_DEST = str(PROJECT_PATH / 'tests' / '_testdata' / 'media')


# APP CONFIGURATION (PRODUCTION)
# ------------------------------------------------------------------------------

class ProductionConfig(Config):
    """ Defines configuration values for production environments. """


# CONFIGURATION OBJECT
# ------------------------------------------------------------------------------

config = {
    'default': DevelopmentConfig,
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
}
