from rest_framework import serializers
from .models import Movie, MovieRec

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class MovieRecSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieRec
        fields = '__all__'