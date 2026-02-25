from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Review(models.Model):
    avatar = models.ImageField(upload_to='reviews/', null=True, blank=True)
    name = models.CharField(max_length=100)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    content = models.TextField()
    published_at = models.DateField()
    source = models.CharField(max_length=50, default='Google')
    external_link = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return f"{self.name} - {self.rating}★"
