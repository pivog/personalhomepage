import random

from django.http import JsonResponse
from .models import Post, ChessGame
from django.shortcuts import render, redirect


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
            "imgurl": post.imageUrl
        }
        return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)


def get_chess_game(request):
    games = ChessGame.objects.all()
    output = {}
    if not request.GET.get("id"):
        output = {
            "pgn": games[random.randint(0, len(games)-1)].pgn
        }
        return JsonResponse(output, status=200)

    for game in games:
        print(game.id)
        print(request.GET.get("id"))
        if str(game.id) == str(request.GET.get("id")):
            output = {
                "pgn": game.pgn,
            }
            return JsonResponse(output, status=200)
    return JsonResponse(output, status=404)