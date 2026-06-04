from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from books.views import BookViewSet, CategoryViewSet, AuthorViewSet
from orders.views import OrderViewSet
from payments.views import ClickWebhookView, PaymeWebhookView
from ai.views import AiRecommendationView

# Create a global DRF API Router
router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'authors', AuthorViewSet, basename='author')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Core REST Framework endpoints
    path('api/', include(router.urls)),
    
    # JWT Authentication Endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Payments Gateways Webhooks
    path('api/payments/click/', ClickWebhookView.as_view(), name='click_webhook'),
    path('api/payments/payme/', PaymeWebhookView.as_view(), name='payme_webhook'),
    
    # AI Assistant Endpoint
    path('api/ai/recommend/', AiRecommendationView.as_view(), name='ai_recommend'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
