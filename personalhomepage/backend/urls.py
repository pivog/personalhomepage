from .views import get_article, get_chess_game
from django.urls import path

urlpatterns = [
    path("getarticle", get_article),
    path("getchessgame", get_chess_game),
]
