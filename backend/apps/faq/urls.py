from rest_framework.routers import DefaultRouter
from .views import FAQViewSet

router = DefaultRouter()
router.register(r'faq', FAQViewSet, basename='faq')
router.register(r'admin/faq', FAQViewSet, basename='admin-faq')

urlpatterns = router.urls
