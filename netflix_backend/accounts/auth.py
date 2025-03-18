from rest_framework import authentication, exceptions
from django.utils import timezone
from .models import CustomToken

class CustomTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token_key = request.COOKIES.get('auth_token')
        if not token_key:
            return None
        try:
            token = CustomToken.objects.get(key=token_key)

            if token.expires <timezone.now():
                raise exceptions.AuthenticationFailed("Token expired")
            return (token.user,token)
        except CustomToken.DoesNotExist:
            raise exceptions.AuthenticationFailed("Invalid token")