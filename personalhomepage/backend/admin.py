from django.contrib import admin
from .models import Post, ChessGame, Project, PersonalChessGame, LatinWords

# Register your models here.
admin.site.register(Post)
admin.site.register(ChessGame)
admin.site.register(Project)
admin.site.register(PersonalChessGame)
admin.site.register(LatinWords)