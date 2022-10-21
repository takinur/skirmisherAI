from django.urls import path
from . import views


from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# Jobs Routes
router.register('jobs', views.VacancyView, basename='jobs')
router.register('jobs-public', views.RetriveVacancyView,
                basename='public-jobs')

# Applications Routes
router.register('v1/application', views.JobApplicationView,
                basename='applications')
router.register('v1/application-dashboard',
                views.RetriveJobApplicationView, basename='applications-dashboard')

# Interview Routes
router.register('v1/invitation', views.InvitationView)

# Blog Routes
router.register('v1/blog', views.BlogView, basename='blog')

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),

    path('auth/register/', views.RegisterView.as_view()),
    path('auth/user/', views.RetriveUserView.as_view()),

    path('auth/login/', views.MyTokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),

    # Resume Upload
    path('upload/resume/', views.FileUploadView.as_view()),

    # EMP PROFILE
    path('account/employer/', views.EmployerProfileView.as_view()),
    path('account/employer/<int:user_id>', views.EmployerProfileView.as_view()),
    # Cand PROFILE
    path('account/candidate/', views.CandidateProfileView.as_view()),
    path('account/candidate/<int:user_id>',
         views.CandidateProfileView.as_view()),

]

urlpatterns += router.urls
