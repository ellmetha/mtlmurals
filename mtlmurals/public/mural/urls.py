from django.conf.urls import url

from . import views

app_name = 'mural'
urlpatterns = [
    url(r'^$', views.MuralEntryPointView.as_view(), name='entrypoint'),
]
