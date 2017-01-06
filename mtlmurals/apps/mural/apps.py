# -*- coding: utf-8 -*-

from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class MuralAppConfig(AppConfig):
    label = 'mural'
    name = 'mtlmurals.apps.mural'
    verbose_name = _('Mural')
