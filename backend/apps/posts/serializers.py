from rest_framework import serializers
from .models import Post, Tag
from apps.expertises.models import Expertise
from apps.expertises.serializers import ExpertiseListSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class PostListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    expertise = ExpertiseListSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'excerpt', 'cover_image',
                  'expertise', 'tags', 'published', 'views', 'created_at']


class PostDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    expertise = ExpertiseListSerializer(read_only=True)
    expertise_id = serializers.PrimaryKeyRelatedField(
        source='expertise', queryset=Expertise.objects.all(),
        write_only=True, required=False, allow_null=True
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        source='tags', many=True, queryset=Tag.objects.all(),
        write_only=True, required=False
    )

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'cover_image',
            'expertise', 'expertise_id', 'tags', 'tag_ids',
            'published', 'views', 'created_at', 'updated_at',
        ]
