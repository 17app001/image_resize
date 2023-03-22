from django.urls import path
from . import views

urlpatterns = [
    path('', views.resize, name=''),
    path('resize/', views.resize, name='resize'),
]
