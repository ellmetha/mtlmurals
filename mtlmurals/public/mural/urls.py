from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.MuralEntryPointView.as_view(), name='entrypoint'),
]
