# -*- coding: utf-8 -*-

import os
import shutil

import pytest

from mtlmurals import create_app


@pytest.yield_fixture(scope='session')
def flask_app():
    """ Yields an instance of the Flask application. """
    app = create_app('testing')
    from mtlmurals.extensions import db
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()


@pytest.yield_fixture(scope='session', autouse=True)
def empty_media(flask_app):
    """ Removes the files in upload folders that could have been created during tests execution. """
    yield
    uploads_dest = flask_app.config['UPLOADS_DEFAULT_DEST']
    if os.path.exists(uploads_dest):
        for candidate in os.listdir(uploads_dest):
            path = os.path.join(uploads_dest, candidate)
            try:
                shutil.rmtree(path)
            except OSError:
                os.remove(path)
