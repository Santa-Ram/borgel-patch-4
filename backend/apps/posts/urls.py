from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'admin/posts', PostViewSet, basename='admin-post')

urlpatterns = [
    path('', include(router.urls)),
]
