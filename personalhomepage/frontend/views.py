from django.shortcuts import render, redirect


# Create your views here.
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")


def redirectToCounter(request):
    return redirect("/counter")

def piva_za_adnu(request):
    return render(request, "frontend/piva.html")
