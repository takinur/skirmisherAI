from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

# import model from parent folder
from ..models import CandidateProfile, Education, EmployerProfile, FileUpload, Skill

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        # ...

        return token

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
       model = User
       fields = ('id', 'name', 'email', 'password', 'role')
       extra_kwargs = {'password': {'write_only': True}}
       
    # Return role as a string instead of an integer
    def to_representation(self, instance):
        data = super().to_representation(instance)            
        data['role'] = 'CANDIDATE' if data['role'] != 1 else 'EMPLOYER'
        return data
    
    # Validate password
    def validate(self, data):
        try :
            validate_password(data['password'])
        except serializers.ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})     
        
        return data
       
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
            
        return user


class EmployerProfileSerializer(serializers.ModelSerializer):
    # image_url = serializers.ImageField(required=False)
    class Meta:
        model = EmployerProfile
        fields = '__all__'
        extra_kwargs = {'user': {'write_only': True}}



class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']
        extra_kwargs = {'candidate': {'write_only': True}}
        
class EduSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'name']
        extra_kwargs = {'candidate': {'write_only': True}}

class CandidateProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)    
    educations = EduSerializer(many=True, read_only=True)    
        
    class Meta:
        model = CandidateProfile
        fields = ['id', 'resume_file', 'user', 'name', 'phone', 'designation', 'location', 'skills', 'website', 'educations']
        extra_kwargs = {'user': {'write_only': True}, 'resume_raw_text': {'write_only': True}}
        

    def create(self, validated_data):   
        skills_data = validated_data.pop('skills')
        edu_data = validated_data.pop('edu')
        
        candidate = CandidateProfile.objects.create(**validated_data)
        # Save skills
        for skill in skills_data:
            Skill.objects.create(candidate=candidate, name = skill)
        # Save educations
        for edu in edu_data:
            Education.objects.create(candidate=candidate, name = str(edu))

        return candidate #Main return 
        
class FileSerializer(serializers.Serializer):
    file = serializers.FileField(max_length = None,
        allow_empty_file = False,
        write_only = True
        )
    
    class Meta:
        fields = ['file']    
        model = FileUpload
        
    def validate(self, data):
        file = data['file']
        if file.content_type != 'application/pdf':
            raise serializers.ValidationError("File is not a PDF")
        # File size shoud be less than 5MB
        if file.size > 5242880:
            raise serializers.ValidationError("File is too large")
        return data
    
    def create(self, validated_data):        
        file = FileUpload.objects.create(**validated_data)
        return file