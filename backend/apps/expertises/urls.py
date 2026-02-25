from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpertiseViewSet

router = DefaultRouter()
router.register(r'expertises', ExpertiseViewSet, basename='expertise')
router.register(r'admin/expertises', ExpertiseViewSet, basename='admin-expertise')

urlpatterns = [
    path('', include(router.urls)),
]
