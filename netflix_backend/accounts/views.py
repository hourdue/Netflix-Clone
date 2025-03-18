from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from .models import CustomToken
import datetime
from django.conf import settings
from django.utils import timezone
from .models import Movie, MovieRec
from .serializers import MovieSerializer, MovieRecSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error':'Please provide both username and password'},
                status = status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(request = request, username = username, password = password)

        if not user:
            return Response(
                {'error':'Invalid credentials'},
                status = status.HTTP_401_UNAUTHORIZED
            )
        
        token, created = CustomToken.objects.get_or_create(
            user = user,
            defaults={'expires':timezone.now() + datetime.timedelta(days=7)}
        )

        if not created and not token.is_valid():
            token.delete()
            token = CustomToken.objects.create(user=user)

        response = Response({'success':'Login successful'})

        response.set_cookie(
            'auth_token',
            token.key,
            httponly=True,
            secure=settings.SESSION_COOKIE_SECURE,
            samesite=settings.SESSION_COOKIE_SAMESITE,
            max_age=7*24*60*60
        )

        return response
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        token_key = request.COOKIES.get('auth_token')
        if token_key:
            try:
                token = CustomToken.objects.get(key=token_key)
                token.delete()
            except CustomToken.DoesNotExist:
                pass
        
        response = Response({'success': 'Logout successful'})
        
        response.delete_cookie('auth_token')
        
        return response

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        })
    
class MovieView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MovieSerializer
    def get(self, request):
        queryset = Movie.objects.all()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)
    
class MovieRecView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MovieRecSerializer

    def get(self, request):
        id = request.user.id
        queryset = MovieRec.objects.get(userID=id)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)