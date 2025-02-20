from django.db import models

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