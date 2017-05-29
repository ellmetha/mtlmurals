from rest_framework.filters import DjangoFilterBackend, SearchFilter
from rest_framework.generics import ListAPIView

from mtlmurals.apps.mural.models import Mural

from . import serializers


class MuralListAPIView(ListAPIView):
    """ Returns a list of murals. """
    filter_backends = (DjangoFilterBackend, SearchFilter, )
    filter_fields = ('year', )
    paginate_by = 20
    queryset = Mural.objects.all()
    search_fields = ('address', 'address_2', )
    serializer_class = serializers.MuralSerializer
