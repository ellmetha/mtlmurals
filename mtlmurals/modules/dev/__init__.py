"""
    The ``dev`` module
    ==================

    This module defines context processors and views that are only used during developments.

"""

from flask_uploads import configure_uploads


def init_app(app, **kwargs):
    # Sets up upload sets.
    from . import uploadsets
    configure_uploads(app, (uploadsets.thumbnails, ))

    # Register context processors
    from . import context_processors
    app.context_processor(context_processors.webpack)
