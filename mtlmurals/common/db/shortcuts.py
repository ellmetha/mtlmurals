"""
    Common db shortcuts
    ===================

    This module provides common helper functions that can be used to manipulate model data.

"""


def get_or_create(session, model, **kwargs):
    """ Gets ot creates a model instance. """
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        instance = model(**kwargs)
        session.add(instance)
        session.commit()
        return instance, True
