from django.conf.urls import include
from django.conf.urls import url
from django.views.generic import RedirectView


urlpatterns = [
    url(r'^$', RedirectView.as_view(pattern_name='mural:entrypoint', permanent=False), name='home'),
    url(r'^api/', include('mtlmurals.public.api.urls')),
    url(r'^murals/', include('mtlmurals.public.mural.urls')),
]
