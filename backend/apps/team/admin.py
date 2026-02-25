from django.contrib import admin
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'is_active', 'order')
    list_filter = ('is_active', 'expertises')
    search_fields = ('name', 'role', 'biography')
    list_editable = ('is_active', 'order')
    ordering = ('order',)
