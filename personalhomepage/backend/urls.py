from .views import get_article, get_chess_game, get_all_projects, get_project, get_all_chess_games_names, login, \
    get_all_personal_chess_games_names, get_personal_chess_game, get_latin_words
from django.urls import path

urlpatterns = [
    path("getarticle", get_article),
    path("getchessgame", get_chess_game),
    path("getpersonalchessgame", get_personal_chess_game),
    path("getchessgamesnames", get_all_chess_games_names),
    path("getpersonalchessgamesnames", get_all_personal_chess_games_names),
    path("getprojects", get_all_projects),
    path("getproject", get_project),
    path("getlatinwords", get_latin_words),
    path("login", login),
]