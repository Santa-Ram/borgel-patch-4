from rest_framework import serializers, viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Newsletter


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def subscribe(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email requis'}, status=status.HTTP_400_BAD_REQUEST)
    obj, created = Newsletter.objects.get_or_create(email=email)
    if not created:
        obj.is_active = True
        obj.save()
    return Response({'success': 'Inscription confirmée'}, status=status.HTTP_201_CREATED)
