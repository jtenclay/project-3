from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(max_length=32)
    def __str__(self):
        return self.name

class SourceUrl(models.Model):
    url = models.CharField(max_length=2000, blank=True)
    image_url = models.CharField(max_length=2000, blank=True)
    title = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return self.title

class Source(models.Model):
    source_post = models.ForeignKey('Post', null=True, blank=True, on_delete=models.SET_NULL)
    source_url = models.ForeignKey(SourceUrl, null=True, blank=True, on_delete=models.SET_NULL)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post_source = models.ForeignKey(Source, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    is_private = models.BooleanField(default=False, blank=True)

    def publish(self):
        self.published_at = timezone.now()
        self.save()

    def __str__(self):
        return self.title
