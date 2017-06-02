#!/usr/bin/env python

"""
    The ``autoapp`` module
    ======================

    This module creates an instance of the Flask application.

"""

import os

from mtlmurals import create_app


app = create_app(os.getenv('FLASK_CONFIG', 'default'))
