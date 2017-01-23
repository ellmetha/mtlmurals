from django.utils.text import Truncator
from easy_thumbnails.files import get_thumbnailer
from rest_framework import serializers

from mtlmurals.apps.mural.models import Mural


class MuralSerializer(serializers.ModelSerializer):
    """ Serializer used to represent murals when using mural search engines APIs. """

    title = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Mural
        fields = [
            'id', 'title', 'image_url', 'year', 'address', 'address_2', 'zip_code', 'city',
            'country', 'latitude', 'longitude',
        ]

    def get_title(self, obj):
        title = obj.address[0].upper() + obj.address[1:]
        return Truncator(title).chars(50)

    def get_image_url(self, obj):
        return get_thumbnailer(obj.image)['mural_search_engine_list_item'].url
