from django.contrib import admin
from .models import GallerySection, GalleryImage

@admin.register(GallerySection)
class GallerySectionAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('section', 'caption', 'order')
    list_filter = ('section',)
    list_editable = ('order',)
    ordering = ('section', 'order')