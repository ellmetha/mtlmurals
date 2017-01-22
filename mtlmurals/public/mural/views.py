from django.views.generic import TemplateView


class MuralEntryPointView(TemplateView):
    """ The main entrypoint of our murals search engine. Just a template view, though. """
    template_name = 'mural/entrypoint.html'
