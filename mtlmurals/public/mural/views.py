from django.views.generic import TemplateView

from mtlmurals.apps.mural.models import Mural


class MuralEntryPointView(TemplateView):
    """ The main entrypoint of our murals search engine. Just a template view, though. """
    template_name = 'mural/entrypoint.html'

    def get_context_data(self, **kwargs):
        context = super(MuralEntryPointView, self).get_context_data(**kwargs)
        context['choices_year'] = Mural.objects.order_by('year').values_list('year', flat=True) \
            .distinct()
        return context
