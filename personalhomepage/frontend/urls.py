from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("about", index),
    path("projects", index),
    path("chessgames", index),
    path("contact", index),
    path("article", index),
]
