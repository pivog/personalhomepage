from .views import get_article
from django.urls import path

urlpatterns = [
    path("getarticle", get_article)
]
