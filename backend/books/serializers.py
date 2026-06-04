from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Category, Author, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

class BookListSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    author = serializers.CharField(source='author.name')

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'slug', 'author', 'category', 'sku', 'price', 'old_price', 'rating', 'stock', 
            'cover_image', 'binding', 'publisher', 'translator', 'language', 'published_year', 
            'has_preview', 'has_ebook', 'ebook_price', 'has_audio', 'audio_price'
        ]

class BookDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
