from django.contrib.auth.models import User, Group
from .models import Tag, Post, Source, SourceUrl
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class TagSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'name')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'url', 'author', 'title', 'description', 'created_at', 'updated_at', 'published_at', 'tags', 'is_private', 'post_source')

class SourceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Source
        fields = ('source_post', 'source_url')

class SourceUrlSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SourceUrl
        fields = ('url', 'image_url', 'title')
