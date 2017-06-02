"""
    Development context processors
    ==============================

    This module defines context processors used to inject variables into the context of templates
    during developments.

"""

from flask import current_app


def webpack():
    """ Inserts a Webpack dev server URL into the context. """
    return {'WEBPACK_DEV_SERVER_URL': current_app.config.get('WEBPACK_DEV_SERVER_URL'), } \
        if current_app.config.get('WEBPACK_DEV_SERVER_STARTED') else {}
