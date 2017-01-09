from django.db import models
from django.utils.translation import ugettext_lazy as _


class Person(models.Model):
    """ Represents a person. """

    lastname = models.CharField(max_length=150, verbose_name=_('Last name'))
    firstname = models.CharField(max_length=150, verbose_name=_('First name'))

    class Meta:
        abstract = True

    def __str__(self):
        return self.full_name

    @property
    def full_name(self):
        return '{:s} {:s}'.format(self.firstname, self.lastname.upper())
