from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
       model = User
       fields = ('id', 'name', 'email', 'password')
       extra_kwargs = {'password': {'write_only': True}}
       
    # Validate password and return Hashed password
    def valilidate(self, data):
        password = data['password']
        try :
            validate_password(password)
        except serializers.ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})
        
        # data['password'] = make_password(password)
        
        return data
       
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
            
        return user

