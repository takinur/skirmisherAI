from django.urls import path
from . import views
from .views import MyTokenObtainPairView, RegisterView, RetriveUserView

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),
    
    path('auth/register/', RegisterView.as_view()),
    path('auth/user/', RetriveUserView.as_view()),
    
    path('auth/login/', MyTokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
    
    path('employer/', views.EmployerProfileView.as_view()),
]
