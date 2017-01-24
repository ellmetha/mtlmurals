from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ExtendedPageNumberPagination(PageNumberPagination):
    """ Improves the `PageNumberPagination` behavior by adding additional pagination data. """

    def get_paginated_response(self, data):
        return Response({
            'pagination': {
                'count': self.page.paginator.count,
                'num_pages': self.page.paginator.num_pages,
                'current_page': self.page.number,
                'next_page': self.page.next_page_number() if self.page.has_next() else None,
                'previous_page': (
                    self.page.previous_page_number()if self.page.has_previous() else None),
                'links': {
                    'next': self.get_next_link(),
                    'previous': self.get_previous_link(),
                },
            },
            'results': data,
        })
