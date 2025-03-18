from django.db import models
from django.conf import settings
from django.utils import timezone
import datetime
import secrets

class CustomToken(models.Model):
    key = models.CharField(max_length=64, primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='auth_tokens',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()

    def save(self,*args,**kwargs):
        if not self.key:
            self.key = self.generate_key()
            self.expires = timezone.now() + datetime.timedelta(days=7)
        return super().save(*args,**kwargs)
    
    @classmethod
    def generate_key(cls):
        return secrets.token_hex(32)
    
    def is_valid(self):
        return self.expires > timezone.now()
    
    def __str__(self):
        return f"Token {self.key[:10]}... for {self.user}"
    
class Movie(models.Model):
    title = models.CharField(max_length=200)
    thumbnail = models.CharField(max_length=500)
    video_url = models.CharField(max_length=500)
    description = models.TextField(default=None)
    rating = models.FloatField(default=0)
    year = models.SmallIntegerField(default=0)
    genre = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class MovieRec(models.Model):
    userID = models.SmallIntegerField(default=0)
    movieID1 = models.SmallIntegerField(default=0)
    movieID2 = models.SmallIntegerField(default=0)

    def __str__(self):
        return str(self.userID)