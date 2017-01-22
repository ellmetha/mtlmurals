from django.conf.urls import include
from django.conf.urls import url

from . import views


mural_urlpatterns = [
    url(r'^$', views.MuralListAPIView.as_view(), name='mural_list'),
]

urlpatterns = [
    url(r'^murals/', include(mural_urlpatterns, namespace='mural')),
]
