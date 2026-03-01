from django.db import models

class FAQ(models.Model):
    question = models.CharField(max_length=500)
    answer   = models.TextField()
    keywords = models.CharField(max_length=500, blank=True, help_text="Mots-clés séparés par des virgules")
    category = models.CharField(max_length=100, blank=True)
    order    = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.question[:80]

    def keywords_list(self):
        return [k.strip() for k in self.keywords.split(',') if k.strip()]
