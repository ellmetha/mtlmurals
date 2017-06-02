"""
    Common model classes
    ====================

    This module provides common model classes that can be used to create models.

"""

from ...extensions import db
from .shortcuts import get_or_create


class Model(db.Model):
    """ Base model class that adds convenience methods for CRUD operations. """

    __abstract__ = True

    @classmethod
    def create(cls, **kwargs):
        """ Creates a new record and save it the database. """
        instance = cls(**kwargs)
        return instance.save()

    @classmethod
    def get_or_create(cls, **kwargs):
        """ Gets ot creates a instance of the model. """
        return get_or_create(db.session, cls, **kwargs)

    def update(self, commit=True, **kwargs):
        """ Updates specific fields of a record. """
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        """ Saves the record. """
        db.session.add(self)
        if commit:
            db.session.commit()
        return self

    def delete(self, commit=True):
        """ Removes the record from the database. """
        db.session.delete(self)
        return commit and db.session.commit()
