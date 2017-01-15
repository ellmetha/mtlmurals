from django.conf.urls import include
from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from django.views.generic import RedirectView


urlpatterns = [
    url(r'^$', RedirectView.as_view(pattern_name='mural:entrypoint', permanent=False), name='home'),
    url(_(r'^murals/'), include('mtlmurals.public.mural.urls', namespace='mural')),
]
