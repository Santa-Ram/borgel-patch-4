from django.db import models


class Expertise(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50)
    summary = models.TextField()
    description = models.TextField()
    hero_image = models.ImageField(upload_to='expertises/', blank=True, null=True)
    legal_elements = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
