from rich import print #Pretty print

import os
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import CandidateProfileSerializer, FileSerializer, UserCreateSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import CandidateProfile, EmployerProfile
from .serializers import EmployerProfileSerializer

# Machine Leaning Model from 
from ..ml_facade import ResumeExtractor


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
        '/api/employer/'
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
        
        return Response({"access": str(tokenacc), "refresh": str(tokenref)} , status=status.HTTP_201_CREATED)
    
class RetriveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        user = UserCreateSerializer(user)
        
        return Response(user.data, status=status.HTTP_200_OK)
    
    
class EmployerProfileView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    # queryset = EmployerProfile.objects.order_by('-created_at')
    # serializer_class = EmployerProfileSerializer
    # parser_classes = (MultiPartParser, FormParser)
    
    # def perform_create(self, serializer):
    
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
    # queryset = EmployerProfile.objects.order_by('-created_at')
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
        # Return profile with skills
        # CandidateProfile.objects.prefetch_related('skills').get(user_id=user_id)
    
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
        resume = data['resume_file'].replace('"', '') # Remove quotes from string
        # For Debugging
        # resume = '/resources/resumes/T_007.pdf'.split('/', 2)[2]
        # print('temp', resume)
            # Parser Class for resume file
        ext_data = ResumeExtractor.resume_result_wrapper(os.path.join(settings.MEDIA_ROOT, resume)) 
        # print(ext_data)
        try: 
            # Getting data from extracted data               
            text = ext_data['text'] 
            name = ext_data['name']                    
            email = ext_data['email']
            phone = ext_data['phone']
            total_exp = ext_data['total_experience']
            
            skills = ext_data['skills']
            edu = set(ext_data['education']) #Convert to unique set
            projects = ext_data['projects']
            exp = ext_data['experience']
            socili = ext_data['social_links']
            
            # Format data for serializer
            
            print('Suppose to be', type(skills), 'But became:', type(edu))
            
            # Convert List to set
            edu = set(edu)
            
            print('here we go again', type(edu), str(edu))
            # Add resume data to serializer data and save
            

            # Save to database including Extracted Data
            serializer.save(skills = skills, name = name, email = email, resume_raw_text = text, edu = edu) 


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