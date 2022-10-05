from django.urls import path
from . import views
from .views import (
    JobApplicationView,
    MyTokenObtainPairView, 
    RegisterView, 
    RetriveUserView,
    FileUploadView,
    EmployerProfileView,
    CandidateProfileView,
    VacancyView,
    RetriveVacancyView,
    )

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# Jobs Routes
router.register('jobs', VacancyView, basename='jobs')
router.register('jobs-public', RetriveVacancyView, basename='public-jobs')

#Applications Routes
router.register('application', JobApplicationView, basename='applications')

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),
    
    path('auth/register/', RegisterView.as_view()),
    path('auth/user/', RetriveUserView.as_view()),
    
    path('auth/login/', MyTokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
    
    # Resume Upload
    path('upload/resume/', FileUploadView.as_view()),

    # EMP PROFILE
    path('account/employer/', EmployerProfileView.as_view()),
    path('account/employer/<int:user_id>', EmployerProfileView.as_view()),
    # Cand PROFILE
    path('account/candidate/', CandidateProfileView.as_view()),
    path('account/candidate/<int:user_id>', CandidateProfileView.as_view()),
] 

urlpatterns += router.urls
