from rest_framework import serializers

from mtlmurals.apps.mural.models import Mural


class MuralSerializer(serializers.ModelSerializer):
    """ Serializer used to represent murals when using mural search engines APIs. """

    class Meta:
        model = Mural
        fields = [
            'id', 'image', 'year', 'address', 'address_2', 'zip_code', 'city', 'country',
            'latitude', 'longitude',
        ]
