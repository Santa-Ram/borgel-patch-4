from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GallerySectionViewSet, GalleryImageViewSet

router = DefaultRouter()
router.register(r'gallery/sections', GallerySectionViewSet, basename='gallery-section')
router.register(r'gallery/images', GalleryImageViewSet, basename='gallery-image')
router.register(r'admin/gallery', GallerySectionViewSet, basename='admin-gallery')

urlpatterns = [
    path('', include(router.urls)),
]
