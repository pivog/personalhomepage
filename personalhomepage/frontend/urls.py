from django.urls import path, re_path
from .views import index, redirectToCounter

urlpatterns = [
    re_path(r".*", index),
    # path("", redirectToCounter), # temporary
    # path("about", index),
    # path("projects", index),
    # path("chessgames", index),
    # path("contact", index),
    # path("article", index),
    # path("latinski", index),
    # path("project", index),
    # path("listchessgames", index),
    # path("listpersonalchessgames", index),
    # path("login", index),
]
