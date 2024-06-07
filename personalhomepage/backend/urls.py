from .views import get_article, get_chess_game, get_all_projects, get_project
from django.urls import path

urlpatterns = [
    path("getarticle", get_article),
    path("getchessgame", get_chess_game),
    path("getprojects", get_all_projects),
    path("getproject", get_project),
]
