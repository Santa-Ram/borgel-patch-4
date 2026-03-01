from rest_framework import serializers
from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    keywords_list = serializers.ReadOnlyField()

    class Meta:
        model = FAQ
        fields = '__all__'
        extra_kwargs = {
            'keywords': {'required': False, 'allow_blank': True},
            'category': {'required': False, 'allow_blank': True},
        }
