from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from .serializers import UserCreateSerializer, MyTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView


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
    ]
    
    return Response(routes)


class RegisterView(APIView):    
    def post(self, request):
        data = request.data
        # name = data['name']
        # email = data['email']
        # password = data['password']
        
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