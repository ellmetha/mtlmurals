"""
    The ``mural`` module
    ====================

    This module defines the models allowing to store and manipulate information regarding murals.

"""

from flask_uploads import configure_uploads

from mtlmurals.extensions.api import api_v1


def init_app(app, **kwargs):
    # Touches underlying modules.
    from . import models, resources  # noqa: F401

    # Sets up commands.
    from . import commands
    app.cli.add_command(commands.import_murals)

    # Sets up upload sets.
    from . import uploadsets
    configure_uploads(app, (uploadsets.mural_images, ))

    # Sets up the API namespaces.
    api_v1.add_namespace(resources.api)

    # Register blueprints.
    from . import views
    app.register_blueprint(views.mural_blueprint)
