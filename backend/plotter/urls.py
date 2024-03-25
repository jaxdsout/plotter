from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgentViewSet, ClientViewSet, ListViewSet, OptionViewSet, LoginView


router = DefaultRouter()
router.register(r'agents', AgentViewSet, basename='agent')
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'lists', ListViewSet, basename='list')
router.register(r'options', OptionViewSet, basename='option')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login')
]

urlpatterns += router.urls
