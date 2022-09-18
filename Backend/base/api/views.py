import os
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import CandidateProfileSerializer, UserCreateSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import CandidateProfile, EmployerProfile, Resume, Skill
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
        # Create profile with given data
        data = request.data
        serializer = CandidateProfileSerializer(data=data)
        if serializer.is_valid():
            # serializer.save()    
            # Remove URL till second slash
            # resume = serializer.data['resume_file'].split('/', 2)[2]
            
            # For Debugging
            resume = '/resources/resumes/T_007.pdf'.split('/', 2)[2]
            
            # TODO:Check for NULL here
            # EH?: Add try catch for extractor class
             # Parser Class for resume file
            extracted_data = ResumeExtractor.resume_result_wrapper(os.path.join(settings.MEDIA_ROOT, resume)) 
            # Save extracted data to database
            # skills = extracted_data['skills']
            # education = extracted_data['education']
            try: 
                if extracted_data['name'] is not None:
                    name = extracted_data['name']
                    
                email = extracted_data['email']
                
                phone = extracted_data['phone']
                if extracted_data['phone'] is None:
                    phone = '0000000000'
                total_exp = extracted_data['total_experience']
                
            
                # savedData = Resume.objects.create(
                #     # candidate_profile_id=serializer.data['id'],
                #     # resume_url = serializer.data['resume_file'],
                #     # Hardcoded for now
                #     CandidateProfile_id=24,
                #     resume_url = resume,
                #     name = name,
                #     email = email,
                #     phone = phone,
                    
                #     # education=education,
                # )
                
                # # Save every skill in database
                # for skill in extracted_data['skills']:
                #     Skill.objects.create(
                #         name = skill,
                #         resume = savedData
                #         )
            
                # print(savedData.id)
                # ADD skills to Data
                # data['skills']  = extracted_data['skills']
                serializer.save(skills= extracted_data['skills'])
                # data['name'] = extracted_data['name']
                # # data.push(extracted_data['skills'])
                # # print(data['name'])
                # serializer.save()    

            except Exception as e:
                print(e)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)