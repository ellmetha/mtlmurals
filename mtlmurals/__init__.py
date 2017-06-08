"""
    The ``mtlmurals`` application
    =============================

    This application allows to browse Montréal murals.

"""

from flask import Flask

from config import config

from . import extensions
from . import modules


def create_app(config_name):
    config_obj = config[config_name]()
    app = Flask(
        __name__, static_url_path='/static',
        static_folder='static/build' if not config_obj.DEBUG else 'static/build_dev')

    # Initializes configuration values.
    app.config.from_object(config_obj)

    # Configure SSL if the current platform supports it.
    if not app.debug and not app.testing and not app.config['SSL_DISABLE']:
        from flask.ext.sslify import SSLify
        SSLify(app)

    # Initializes Flask extensions.
    extensions.init_app(app)

    # Initializes modules.
    modules.init_app(app)

    return app
