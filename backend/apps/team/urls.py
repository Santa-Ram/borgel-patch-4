from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'admin/team', TeamMemberViewSet, basename='admin-team')

urlpatterns = [
    path('', include(router.urls)),
]
