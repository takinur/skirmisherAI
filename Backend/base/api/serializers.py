from typing_extensions import Required
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

# import model from parent folder
from ..models import CandidateProfile, EmployerProfile, Skill

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
        fields = '__all__'
        
class CandidateProfileSerializer(serializers.ModelSerializer):
        
    resume_file = serializers.FileField(
        max_length = None,
        allow_empty_file = False,
        # write_only = True
    )
    class Meta:
        model = CandidateProfile
        fields = '__all__'
        extra_kwargs = {'updated_at': {'write_only': True}}
        
