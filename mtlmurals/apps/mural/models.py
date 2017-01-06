# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _

from mtlmurals.common.abstract_models import Person


class Artist(Person):
    """ Represents an artist. """

    class Meta:
        verbose_name = _('Artist')
        verbose_name_plural = _('Artists')


class Organization(models.Model):
    """ Represents an organization which was financed to make murals. """

    name = models.CharField(max_length=150, verbose_name=_('Name'))

    class Meta:
        verbose_name = _('Organization')
        verbose_name_plural = _('Organizations')

    def __str__(self):
        return self.name


class Program(models.Model):
    """ Represents a program which can finance the creation of murals. """

    name = models.CharField(max_length=150, verbose_name=_('Name'))

    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Organizations')

    def __str__(self):
        return self.name


class Mural(models.Model):
    """ Represents a mural. """

    # The import ID is the identifier associated with each mural that is embedded inside exports of
    # the murals set provided by the Montréal open data website.
    import_id = models.CharField(
        max_length=64, unique=True, db_index=True, verbose_name=_('Import identifier'))

    # A mural can be associated with many artists. It can (potentially) be realized by an
    # organization which was financed to create murals. Fundings can come from a specific program.
    # A mural can also be financed by a specific program.
    artists = models.ManyToManyField(Artist, verbose_name=_('Artists'))
    organization = models.ForeignKey(
        Organization, blank=True, null=True, verbose_name=_('Organization'))
    program = models.ForeignKey(Program, blank=True, null=True, verbose_name=_('Program'))

    # The mural itself!
    image = models.ImageField(upload_to='murals/', blank=True, null=True, verbose_name=_('Image'))

    # The year when the mural was created is stored in this field.
    year = models.PositiveSmallIntegerField(verbose_name=_('Year'))

    # These fields define the address of a mural.
    address = models.CharField(max_length=200, verbose_name=_('Address'))
    address_2 = models.CharField(
        max_length=200, blank=True, null=True, verbose_name=_('Address Line 2'))
    zip_code = models.CharField(
        max_length=20, db_index=True, blank=True, null=True, verbose_name=_('ZIP Code'))
    city = models.CharField(max_length=200, db_index=True, verbose_name=_('City'))
    country = models.CharField(max_length=200, db_index=True, verbose_name=_('Country'))

    # The fields define the coordinates of a mural.
    latitude = models.DecimalField(
        max_digits=27, decimal_places=25, verbose_name=_('Latitude'), db_index=True)
    longitude = models.DecimalField(
        max_digits=27, decimal_places=24, verbose_name=_('Latitude'), db_index=True)

    class Meta:
        ordering = ['-year', ]
        verbose_name = _('Mural')
        verbose_name_plural = _('Murals')

    def __str__(self):
        return _('{address} ({year})').format(address=self.address, year=self.year)
