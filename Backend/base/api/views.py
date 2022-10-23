from datetime import timedelta
# from django.db.models import Count
# from django.db.models.functions import TruncDay
from django.utils import timezone
from rich import print  # Pretty print

import os
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from rest_framework import mixins

from rest_framework_simplejwt.views import TokenObtainPairView

# Serializers from parent folder
from .serializers import BlogSerializer, CandidateProfileSerializer, FileSerializer, InvitationSerializer, JobApplicationSerializer, PublicVacancySerializer
from .serializers import RetriveJobApplicationSerializer, UserCreateSerializer, MyTokenObtainPairSerializer, VacancySerializer, EmployerProfileSerializer

# Models from parent folder
from ..models import Blog, CandidateProfile, EmployerProfile, Invitation, JobApplication, Vacancy

# Machine Leaning Model from
from ..ml_facade import resumeExtractor

from django_q.tasks import async_task


# Token Obtain Pair View
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Documentation URLS
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/auth/login/',
        '/api/auth/token/refresh',
        '/api/auth/token/verify/',
        '/api/auth/register/',
        '/api/auth/user/',
        '/api/employer/',
        '/api/employer/<int:user_id>',
        '/api/candidate/',
        '/api/candidate/<int:user_id>',
        '/api/upload/resume/',
        '/api/jobs/',
        '/api/jobs-public/',
        '/api/v1/application/',
    ]

    return Response(routes)


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        # user = UserCreateSerializer(user)

        tokenref = RefreshToken.for_user(user)
        tokenacc = AccessToken.for_user(user)

        return Response({"access": str(tokenacc), "refresh": str(tokenref)}, status=status.HTTP_201_CREATED)


class RetriveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserCreateSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)


class EmployerProfileView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user_id):
        '''
        Helper method to get object by id
        '''
        try:
            return EmployerProfile.objects.get(user_id=user_id)
        except EmployerProfile.DoesNotExist:
            return None

    # Retrive profile by user id
    def get(self, request, *args, **kwargs):
        user_id = kwargs['user_id']
        profile = self.get_object(user_id)
        if profile is not None:
            serializer = EmployerProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Sadge, Profile not found'})

    def post(self, request, *args, **kwargs):
        # Create profile with given data
        data = request.data
        serializer = EmployerProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CandidateProfileView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = CandidateProfileSerializer
    parser_classes = (MultiPartParser, FormParser)

    # def perform_create(self, serializer):

    def get_object(self, user_id):
        '''
        Helper method to get object by id
        '''
        try:
            return CandidateProfile.objects.get(user_id=user_id)
        except CandidateProfile.DoesNotExist:
            return None

    # Retrive profile by user id
    def get(self, request, *args, **kwargs):
        user_id = kwargs['user_id']
        profile = self.get_object(user_id)
        if profile is not None:
            serializer = CandidateProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'Sadge, Profile not found'})

    def post(self, request, *args, **kwargs):
        # Create profile from request data
        data = request.data
        serializer = CandidateProfileSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # __Save profile
        resume = data['resume_file'].replace(
            '"', '')  # Remove quotes from string
        # For Debugging
        # resume = '/resources/resumes/T_007.pdf'.split('/', 2)[2]
        # print('temp', resume)
        # Parser Class for resume file
        ext_data = resumeExtractor.resume_result_wrapper(
            os.path.join(settings.MEDIA_ROOT, resume))
        # print(ext_data)
        try:
            # Getting data from extracted data
            text = ext_data['text']
            name = ext_data['name']
            email = ext_data['email']
            phone = ext_data['phone']
            total_exp = ext_data['total_experience']

            skills = ext_data['skills']
            edu = set(ext_data['education'])  # Convert to unique set
            experiences = ext_data['experience']
            social = set(ext_data['social_links'])
            projects = set(ext_data['projects'])

            # Format Experience
            exp = {}
            if experiences is not None:
                exp['name'] = experiences[0]
                exp['total'] = total_exp

            # print('SOC', projects)
            # print('Suppose to be', type(skills), 'But became:', type(socili))

            # Add resume data to serializer data and save

            serializer.save(skills=skills, name=name, email=email, phone=phone,
                            resume_raw_text=text, edu=edu, exp=exp, social=social, projects=projects)

        except Exception as e:
            return Response({'message': 'Error while parsing resume', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            saved_file = file_serializer.save()

            return Response(str(saved_file.file), status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Job Views for Employer / Recruiter


class VacancyView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Vacancy.objects.order_by('-created_at')
    serializer_class = VacancySerializer

    # Return all vacancies for employer
    def get_queryset(self):
        emp_id = self.request.query_params.get('emp_id', None)
        if emp_id is not None:
            return Vacancy.objects.filter(employer_id=emp_id).order_by('-created_at')
        # Data not found return empty queryset
        return Vacancy.objects.order_by('-created_at')


# Custom Viewset for Job Views
class VacancyPublicViewSet(
    # mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    """
    A viewset that provides `retrieve`, `create`, and `list` actions.

    """
    pass

# Job Views for Candidates


class RetriveVacancyView(VacancyPublicViewSet):
    #Authentication is not required
    queryset = Vacancy.objects.order_by('-created_at')
    serializer_class = PublicVacancySerializer


# Job Application Views
class JobApplicationView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = JobApplicationSerializer
    queryset = JobApplication.objects.order_by('-created_at')

    def get_object(self, cand_id=None):
        '''
           Helper method to get object by id
        '''
        try:
            return JobApplication.objects.filter(candidate_id=cand_id).order_by('-created_at')
        except JobApplication.DoesNotExist:
            return None

    def get_queryset(self):
        cand_id = self.request.query_params.get('cand_id', None)

        applications = self.get_object(cand_id)
        if applications is not None:
            return applications
            # return Response(serializer.data, status=status.HTTP_200_OK)

        return JobApplication.objects.order_by('-created_at')

    def perform_create(self, serializer):

        saved = serializer.save()
        # Update Suitability Score
        async_task("base.tasks.update_score", saved.id)

        # Return first then call task

        return saved


# Jobs for Employer dashboard
class JobApplicationPublicViewSet(
        mixins.ListModelMixin,
        mixins.RetrieveModelMixin,
        viewsets.GenericViewSet):
    """
    A viewset that provides `retrieve` and `list` actions.

    """
    pass


class RetriveJobApplicationView(JobApplicationPublicViewSet):
    #Authentication is not required
    queryset = JobApplication.objects.order_by('-created_at')
    serializer_class = RetriveJobApplicationSerializer

    def get_queryset(self):
        job_id = self.request.query_params.get('job_id', None)

        if job_id is not None:
            return JobApplication.objects.filter(vacancy_id=job_id).order_by('-total_score')

        return JobApplication.objects.order_by('-created_at')


class InvitationView(viewsets.ModelViewSet):
    queryset = Invitation.objects.order_by('-created_at')
    serializer_class = InvitationSerializer


class BlogView(viewsets.ModelViewSet):
    queryset = Blog.objects.order_by('-created_at')
    serializer_class = BlogSerializer
    lookup_field = 'slug'


# Dashboard Stats
class EmpDashboardStatsView(APIView):

    def get(self, request, *args, **kwargs):
        emp_id = self.request.query_params.get('emp_id', None)

        if emp_id is not None:
            # Get all jobs
            jobs = Vacancy.objects.filter(employer_id=emp_id).count()
            # Get all applications
            total_applications = JobApplication.objects.filter(
                vacancy__employer_id=emp_id).count()
            # Get all shortlisted based on Status
            shortlisted = JobApplication.objects.filter(
                vacancy__employer_id=emp_id, status__icontains='invi').count()

            # User ID for employer
            user_id = EmployerProfile.objects.get(id=emp_id).user_id

            # Get all blog posts by employer
            blogs = Blog.objects.filter(author=user_id).count()

            # Get Last Week Stats
            last_week = timezone.now() - timedelta(days=7)
            # Collect all dates in last week
            week_dates = [last_week + timedelta(days=x) for x in range(0, 7)]

            #  Collect Application from each day of last week
            week_applications = JobApplication.objects.filter(
                vacancy__employer_id=emp_id, created_at__gte=last_week).order_by('-created_at')

            # Collect all applications for each day
            last_app = [week_applications.filter(
                created_at__date=date).count() for date in week_dates]

            # Collect applications for each day of last week Where status is shortlisted
            last_invited = [week_applications.filter(
                status__icontains='invi', created_at__date=date).count() for date in week_dates]

            # Last Week Days in string format
            week_labels = [date.strftime('%A') for date in week_dates]

            # Combine applications and Days to LIST
            # last_app = [[date.strftime('%a'), apps]
            #             for date, apps in zip(week_dates, applications)]
            
                

            data = {
                'jobs': jobs,
                'applications': total_applications,
                'shortlisted': shortlisted,
                'blogs': blogs,
                'week_app': last_app,
                'week_invited': last_invited,
                'week_labels': week_labels
            }

            return Response(data, status=status.HTTP_200_OK)

        return Response({'message': 'No data found'}, status=status.HTTP_204_NO_CONTENT)
