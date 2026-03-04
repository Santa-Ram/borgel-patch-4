from rest_framework import serializers
from .models import Expertise


class LawyerAvatarSerializer(serializers.Serializer):
    """Serializer léger pour les avocats associés à une expertise."""
    id    = serializers.IntegerField()
    name  = serializers.CharField()
    role  = serializers.CharField()
    photo = serializers.ImageField(allow_null=True)


class ExpertiseSerializer(serializers.ModelSerializer):
    lawyers = LawyerAvatarSerializer(many=True, read_only=True)

    class Meta:
        model = Expertise
        fields = '__all__'


class ExpertiseListSerializer(serializers.ModelSerializer):
    lawyers = LawyerAvatarSerializer(many=True, read_only=True)

    class Meta:
        model = Expertise
        fields = ['id', 'name', 'slug', 'icon', 'summary', 'hero_image', 'order', 'lawyers']
