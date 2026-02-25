from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'admin/reviews', ReviewViewSet, basename='admin-review')

urlpatterns = [
    path('', include(router.urls)),
]
