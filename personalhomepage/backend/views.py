import random

from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError

from .models import Post, ChessGame, Project, PersonalChessGame
import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404


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
    output = [{"id": project.id, "title": project.title, "imgUrl": project.imageUrl} for project in projects]
    # for project in projects:
    #     output[str(project.id)] = project.title+";"+project.imageUrl
    return JsonResponse(output, status=200, safe=False)



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


def get_all_chess_games_names(request):
    games = ChessGame.objects.all()
    whiteregex = 'White ".*"'
    blackregex = 'Black ".*"'
    siteregex = 'Site ".*"'
    output = [
        {
            "id": game.id,
            "white": re.findall(whiteregex, game.pgn)[0][7:-1],
            "black": re.findall(blackregex, game.pgn)[0][7:-1],
            "site": re.findall(siteregex, game.pgn)[0][6:-1],
        } for game in games
    ]
    return JsonResponse(output, status=200, safe=False)


@api_view(['POST'])
def get_all_personal_chess_games_names(request):

    # check token
    user = get_object_or_404(Token, key=request.data['token']).user
    if not user.is_superuser:
        return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)

    games = PersonalChessGame.objects.all()
    whiteregex = 'White ".*"'
    blackregex = 'Black ".*"'
    siteregex = 'Site ".*"'
    output = [
        {
            "id": game.id,
            "white": re.findall(whiteregex, game.pgn)[0][7:-1],
            "black": re.findall(blackregex, game.pgn)[0][7:-1],
            "site": re.findall(siteregex, game.pgn)[0][6:-1],
        } for game in games
    ]
    return JsonResponse(output, status=200, safe=False)




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


@api_view(['POST'])
def login(request):
    try:
        user = get_object_or_404(User, username=request.data['username'])
    except MultiValueDictKeyError as e:
        return JsonResponse({'error': 'Missing username and/or password'}, status=401)
    except Exception as e:
        print(e)
        return JsonResponse({'error': str(e)}, status=401)
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    print({'token': token.key, 'user': serializer.data})
    return Response({'token': token.key, 'user': serializer.data})



@api_view(['POST'])
def get_personal_chess_game(request):
    # check token
    user = get_object_or_404(Token, key=request.data['token']).user
    # if not user.is_superuser:
    #     return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)

    #fetch chessgame
    games = PersonalChessGame.objects.all()
    output = {}
    try: gameId = request.data["gameId"]
    except: gameId = ""
    if not gameId:
        output = {
            "pgn": games[random.randint(0, len(games) - 1)].pgn
        }
        return JsonResponse(output, status=200)

    for game in games:
        if str(game.id) == str(request.data["gameId"]):
            output = {
                "pgn": game.pgn,
            }
            return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)