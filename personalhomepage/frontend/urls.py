from django.urls import path
from .views import index, redirectToCounter

urlpatterns = [
    # path("", index),
    path("", redirectToCounter), # temporary
    path("about", index),
    path("projects", index),
    path("chessgames", index),
    path("contact", index),
    path("article", index),
    path("latinski", index),
]
