"""
    Mural database models
    =====================

    This module defines database models allowing to store and manipulate mural-related models.

"""

from sqlalchemy_utils import Timestamp

from mtlmurals.common.db import models
from mtlmurals.common.db.mixins import Person
from mtlmurals.extensions import db


mural_artists = db.Table(
    'mural_artist',
    db.Column('artist_id', db.Integer, db.ForeignKey('artist.id')),
    db.Column('mural_id', db.Integer, db.ForeignKey('mural.id'))
)


class Artist(models.Model, Person):
    """ Represents an artist. """

    __tablename__ = 'artist'
    id = db.Column(db.Integer, primary_key=True)


class Organization(models.Model):
    """ Represents an organization which was financed to make murals. """

    __tablename__ = 'organization'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.Unicode(length=124), nullable=False)


class Program(models.Model):
    """ Represents a program which can finance the creation of murals. """

    __tablename__ = 'program'
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.Unicode(length=124), nullable=False)


class Mural(models.Model, Timestamp):
    """ Represents a mural. """

    __tablename__ = 'mural'
    id = db.Column(db.Integer, primary_key=True)

    # The import ID is the identifier associated with each mural that is embedded inside exports of
    # the murals set provided by the Montréal open data website.
    import_id = db.Column(db.String(length=64), unique=True, index=True)

    # A mural can be associated with many artists. It can (potentially) be realized by an
    # organization which was financed to create murals. Fundings can come from a specific program.
    artists = db.relationship(
        'Artist', secondary=mural_artists, backref=db.backref('murals', lazy='dynamic'))
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=True)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), nullable=True)

    # The mural itself!
    image = db.Column(db.Unicode(length=255), nullable=True)

    # The year when the mural was created is stored in this field.
    year = db.Column(db.SmallInteger)

    # These fields define the address of a mural.
    address = db.Column(db.Unicode(length=124))
    address_2 = db.Column(db.Unicode(length=124), nullable=True)
    zip_code = db.Column(db.String(length=20), nullable=True, index=True)
    city = db.Column(db.Unicode(length=124), index=True)
    country = db.Column(db.Unicode(length=124), index=True)

    # The fields define the coordinates of a mural.
    latitude = db.Column(db.Numeric, index=True)
    longitude = db.Column(db.Numeric, index=True)
