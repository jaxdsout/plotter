from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ClientViewSet, ListViewSet, OptionViewSet, LoginView


router = DefaultRouter()
router.register(r'agents', UserViewSet, basename='agent')
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'lists', ListViewSet, basename='list')
router.register(r'options', OptionViewSet, basename='option')

urlpatterns = [
    path('', include(router.urls)),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LoginView.as_view(), name='logout')
]

urlpatterns += router.urls
