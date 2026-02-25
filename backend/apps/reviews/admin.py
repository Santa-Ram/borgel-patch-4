from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'source', 'is_active', 'published_at')
    list_filter = ('rating', 'is_active', 'source')
    search_fields = ('name', 'content')
    list_editable = ('is_active',)
    ordering = ('-published_at',)
