from django.contrib import admin

from .models import Artist
from .models import Mural
from .models import Organization
from .models import Program


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['__str__', ]


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['name', ]


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['name', ]


@admin.register(Mural)
class MuralAdmin(admin.ModelAdmin):
    list_display = ['address', 'year', 'latitude', 'longitude', ]
