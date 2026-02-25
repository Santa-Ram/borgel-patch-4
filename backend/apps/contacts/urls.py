from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contacts')
router.register(r'notifications', NotificationViewSet, basename='notifications')

urlpatterns = router.urls
