from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
       model = User
       fields = ('id', 'name', 'email', 'password')
       extra_kwargs = {'password': {'write_only': True}}
       
    def validate(self, data):
        try:
            validate_password(data['password'])
        except serializers.ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})
        
        return data
       
def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    
    user.save()
    
    return user

