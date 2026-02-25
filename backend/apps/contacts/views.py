from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Contact, Notification
from .serializers import ContactSerializer, NotificationSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    def get_queryset(self):
        qs = Contact.objects.all()
        archived = self.request.query_params.get('archived', 'false')
        status_filter = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if archived == 'true':
            qs = qs.filter(is_archived=True)
        else:
            qs = qs.filter(is_archived=False)

        if status_filter:
            qs = qs.filter(status=status_filter)

        if search:
            qs = qs.filter(name__icontains=search) | qs.filter(email__icontains=search) | qs.filter(message__icontains=search)

        return qs

    def perform_create(self, serializer):
        contact = serializer.save()
        # Create notification
        Notification.objects.create(
            type='contact',
            title=f'Nouveau message de {contact.name}',
            message=contact.message[:100],
            link='/contacts'
        )

    @action(detail=True, methods=['patch'])
    def mark_read(self, request, pk=None):
        contact = self.get_object()
        contact.is_read = True
        contact.status = 'read'
        contact.save()
        return Response({'status': 'read'})

    @action(detail=True, methods=['patch'])
    def mark_unread(self, request, pk=None):
        contact = self.get_object()
        contact.is_read = False
        contact.status = 'new'
        contact.save()
        return Response({'status': 'unread'})

    @action(detail=True, methods=['patch'])
    def archive(self, request, pk=None):
        contact = self.get_object()
        contact.is_archived = True
        contact.status = 'archived'
        contact.save()
        return Response({'status': 'archived'})

    @action(detail=True, methods=['patch'])
    def unarchive(self, request, pk=None):
        contact = self.get_object()
        contact.is_archived = False
        contact.status = 'read'
        contact.save()
        return Response({'status': 'unarchived'})


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['patch'])
    def mark_all_read(self, request):
        Notification.objects.filter(is_read=False).update(is_read=True)
        return Response({'status': 'all read'})

    @action(detail=True, methods=['patch'])
    def mark_read(self, request, pk=None):
        notif = self.get_object()
        notif.is_read = True
        notif.save()
        return Response({'status': 'read'})
