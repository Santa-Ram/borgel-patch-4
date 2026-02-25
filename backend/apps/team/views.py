import json
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import TeamMember
from .serializers import TeamMemberListSerializer, TeamMemberDetailSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return TeamMemberListSerializer
        return TeamMemberDetailSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = TeamMember.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)
        return qs

    def _clean_data(self, request):
        """Nettoie les données du FormData avant validation."""
        data = request.data.copy()

        # skills doit être une liste JSON, pas une string vide
        if 'skills' in data:
            val = data['skills']
            if not val or val == '':
                data['skills'] = '[]'
            else:
                try:
                    json.loads(val)  # déjà du JSON valide
                except (json.JSONDecodeError, TypeError):
                    data['skills'] = json.dumps([val])

        # Convertir is_active string → booléen
        if 'is_active' in data:
            data['is_active'] = data['is_active'] in ['true', 'True', '1', True]

        # Supprimer les champs vides optionnels pour éviter les erreurs de validation
        for field in ['phone', 'email', 'linkedin', 'twitter', 'facebook', 'instagram', 'whatsapp']:
            if field in data and data[field] == '':
                data[field] = ''

        return data

    def create(self, request, *args, **kwargs):
        data = self._clean_data(request)
        serializer = self.get_serializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        data = self._clean_data(request)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)
        return Response(serializer.data)
