from rest_framework import serializers
from .models import TeamMember
from apps.expertises.models import Expertise
from apps.expertises.serializers import ExpertiseListSerializer
import json


class TeamMemberListSerializer(serializers.ModelSerializer):
    # Retourne les IDs pour que le formulaire admin sache quelles expertises sont sélectionnées
    expertise_ids = serializers.PrimaryKeyRelatedField(
        source='expertises', many=True, read_only=True
    )

    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'photo', 'order', 'is_active', 'expertise_ids']


class TeamMemberDetailSerializer(serializers.ModelSerializer):
    expertises_detail = ExpertiseListSerializer(
        source='expertises', many=True, read_only=True
    )
    expertise_ids = serializers.PrimaryKeyRelatedField(
        source='expertises', many=True,
        queryset=Expertise.objects.all(),
        write_only=True, required=False
    )

    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'role', 'photo', 'biography', 'skills',
            'linkedin', 'twitter', 'facebook', 'instagram',
            'phone', 'email', 'whatsapp',
            'order', 'is_active',
            'expertises_detail', 'expertise_ids',
        ]
        extra_kwargs = {
            'biography': {'required': False, 'allow_blank': True},
            'phone':     {'required': False, 'allow_blank': True},
            'email':     {'required': False, 'allow_blank': True},
            'linkedin':  {'required': False, 'allow_blank': True},
            'twitter':   {'required': False, 'allow_blank': True},
            'facebook':  {'required': False, 'allow_blank': True},
            'instagram': {'required': False, 'allow_blank': True},
            'whatsapp':  {'required': False, 'allow_blank': True},
            'photo':     {'required': False, 'allow_null': True},
        }

    def validate_skills(self, value):
        if isinstance(value, list):
            return value
        if isinstance(value, str):
            if not value.strip():
                return []
            try:
                parsed = json.loads(value)
                return parsed if isinstance(parsed, list) else [parsed]
            except Exception:
                return []
        return []
