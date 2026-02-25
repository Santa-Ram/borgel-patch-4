from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        return PostDetailSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = Post.objects.all()
        # Site public : seulement les publiés
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(published=True)
        return qs

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_staff:
            instance.views += 1
            instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
