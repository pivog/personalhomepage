import random

from django.http import JsonResponse
from .models import Post, ChessGame, Project
import re


# Create your views here.

def get_article(request):
    posts = Post.objects.all()
    output = {}
    for post in posts:
        if str(post.id) == str(request.GET.get("id")):
            output = {
                "title": post.title,
                "body": post.body,
                "imgurl": post.imageUrl,
            }
            return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)


def get_all_articles(request):
    posts = Post.objects.all()
    output = {}
    for post in posts:
        output[post.id] = {
            "title": post.title,
            "body": post.body,
            "imgurl": post.imageUrl,
        }
        return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)


def get_all_projects(request):
    projects = Project.objects.all()
    output = {}
    for project in projects:
        output[str(project.id)] = project.title+";"+project.imageUrl
    return JsonResponse(output, status=200)



def get_chess_game(request):
    games = ChessGame.objects.all()
    output = {}
    if not request.GET.get("id"):
        output = {
            "pgn": games[random.randint(0, len(games) - 1)].pgn
        }
        return JsonResponse(output, status=200)

    for game in games:
        if str(game.id) == str(request.GET.get("id")):
            output = {
                "pgn": game.pgn,
            }
            return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)


def get_all_chess_games(request):
    games = ChessGame.objects.all()
    output = {}
    whiterx = 'White ".*"'
    blackrx = 'Black ".*"'
    output["games"] = ";".join([
        f"{game.id}:{re.findall(whiterx, game.pgn)[0][7:-1]}:{re.findall(blackrx, game.pgn)[0][7:-1]}" for game in games
    ])
    return JsonResponse(output, status=200)


def get_project(request):
    projects = Project.objects.all()
    output = {}
    for project in projects:
        print(project.id, request.GET.get("id"))
        if str(project.id) == str(request.GET.get("id")):
            output = {
                "title": project.title,
                "body": project.body,
                "urlToSite": project.urlToSite,
                "imgUrl": project.imageUrl,
            }
            return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)