from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Expertise
from .serializers import ExpertiseSerializer, ExpertiseListSerializer


class ExpertiseViewSet(viewsets.ModelViewSet):
    queryset = Expertise.objects.filter(is_active=True).order_by('order')
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return ExpertiseListSerializer
        return ExpertiseSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
