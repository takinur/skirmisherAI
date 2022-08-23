from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
User = get_user_model()

from .serializers import UserCreateSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Extend the serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
# Documentation URL
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/auth/login/',
        '/api/token/refresh',
    ]
    
    return Response(routes)


class RegisterView(APIView):    
    def post(self, request):
        data = request.data
        name = data['name']
        email = data['email']
        password = data['password']
        
        user = User.objects.create_user(name, email, password)
        user = UserCreateSerializer(user)
        
        return Response(user.data , status=status.HTTP_201_CREATED)
    
class RetriveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        pass