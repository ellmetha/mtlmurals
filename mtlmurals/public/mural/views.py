from django.views.generic import TemplateView


class MuralEntryPointView(TemplateView):
    template_name = 'mural/entrypoint.html'
