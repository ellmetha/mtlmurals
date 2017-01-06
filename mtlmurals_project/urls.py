# -*- coding: utf-8 -*-

from django.conf import settings
from django.conf.urls import include
from django.conf.urls import url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.views.i18n import javascript_catalog


js_info_dict = {
    'packages': ('base', ),
}

urlpatterns = [
    url(r'^jsi18n/$', javascript_catalog, js_info_dict, name='javascript-catalog'),
]

urlpatterns += i18n_patterns(
    # Admin
    url(r'^' + settings.ADMIN_URL, include(admin.site.urls)),

    # Apps
    url(r'^', include('mtlmurals.public.urls')),
)

if settings.DEBUG:
    # Add the Debug Toolbar’s URLs to the project’s URLconf
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

    # In DEBUG mode, serve media files through Django.
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from django.views import static
    urlpatterns += staticfiles_urlpatterns()
    # Remove leading and trailing slashes so the regex matches.
    media_url = settings.MEDIA_URL.lstrip('/').rstrip('/')
    urlpatterns += [
        url(r'^%s/(?P<path>.*)$' % media_url, static.serve,
            {'document_root': settings.MEDIA_ROOT}),
    ]

    # Test 503, 500, 404 and 403 pages
    from django.views.generic import TemplateView
    urlpatterns += [
        url(r'^403/$', TemplateView.as_view(template_name='403.html')),
        url(r'^404/$', TemplateView.as_view(template_name='404.html')),
        url(r'^500/$', TemplateView.as_view(template_name='500.html')),
        url(r'^503/$', TemplateView.as_view(template_name='503.html')),
    ]
