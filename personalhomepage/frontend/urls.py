from django.urls import path

from .views import index

urlpatterns = [
    # re_path(r".*", index),
    path("", index),
    path("latinskiglagoli", index),
    path("about", index),
    path("projects", index),
    path("chessgames", index),
    path("contact", index),
    path("article", index),
    path("latinski", index),
    path("project", index),
    path("listchessgames", index),
    path("listpersonalchessgames", index),
    path("login", index),
]