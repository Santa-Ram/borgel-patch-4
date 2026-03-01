from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('django-admin/', admin.site.urls),
    # Auth
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Public API
    path('api/', include('apps.posts.urls')),
    path('api/', include('apps.team.urls')),
    path('api/', include('apps.expertises.urls')),
    path('api/', include('apps.gallery.urls')),
    path('api/', include('apps.reviews.urls')),
    path('api/', include('apps.videos.urls')),
    path('api/', include('apps.contacts.urls')),
    path('api/', include('apps.newsletter.urls')),
    path('api/', include('apps.faq.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
