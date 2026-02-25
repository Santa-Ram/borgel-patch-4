from django.contrib import admin
from .models import Post, Tag

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'expertise', 'published', 'views', 'created_at')
    list_filter = ('published', 'expertise', 'tags')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('published',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
