from django.contrib import admin
from .models import Expertise

@admin.register(Expertise)
class ExpertiseAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name', 'summary', 'description')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_active', 'order')
    ordering = ('order',)
