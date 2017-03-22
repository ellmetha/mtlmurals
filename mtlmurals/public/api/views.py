from rest_framework.generics import ListAPIView

from mtlmurals.apps.mural.models import Mural

from . import serializers


class MuralListAPIView(ListAPIView):
    """ Returns a list of murals. """
    filter_fields = ('year', )
    paginate_by = 20
    queryset = Mural.objects.all()
    serializer_class = serializers.MuralSerializer
