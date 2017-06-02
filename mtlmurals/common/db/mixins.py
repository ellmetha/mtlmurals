"""
    Common model mixins
    ===================

    This module defines common model mixins that can be applied to any model.

"""

import sqlalchemy as sa


class Person:
    """ Represents a person.

    This model mixin adds a ``lastname`` column and a ``firstname`` column to a derived declarative
    model.

    """

    lastname = sa.Column(sa.Unicode(length=124), nullable=False)
    firstname = sa.Column(sa.Unicode(length=124), nullable=False)
