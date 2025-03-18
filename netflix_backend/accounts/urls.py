from django.urls import path
from .views import LoginView, LogoutView, UserInfoView, MovieView, MovieRecView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserInfoView.as_view(), name='user-info'),
    path('movie/', MovieView.as_view(), name='movie'),
    path('rec/', MovieRecView.as_view(), name='rec'),
]