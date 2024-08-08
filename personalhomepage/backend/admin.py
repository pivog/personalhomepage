from django.contrib import admin
from .models import Post, ChessGame, Project, PersonalChessGame

# Register your models here.
admin.site.register(Post)
admin.site.register(ChessGame)
admin.site.register(Project)
admin.site.register(PersonalChessGame)