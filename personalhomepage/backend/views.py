from django.http import JsonResponse
from .models import Post


# Create your views here.

def get_article(request):
    posts = Post.objects.all()
    output = {}
    for post in posts:
        if post.id == request.GET.get("id"):
            output = {
                "title": post.title,
                "body": post.body,
                "imgurl": post.imageUrl,
            }
            return JsonResponse(output)
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
