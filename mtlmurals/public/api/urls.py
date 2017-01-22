from django.conf.urls import include
from django.conf.urls import url

from . import views


mural_urlpatterns = [
    url(r'^$', views.MuralListAPIView.as_view(), name='list'),
]

api_urlpatterns = [
    url(r'^murals/', include(mural_urlpatterns, namespace='mural')),
]

urlpatterns = [
    url(r'^v1/', include(api_urlpatterns, namespace='v1')),
]
