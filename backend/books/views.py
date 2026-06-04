from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book, Category, Author, Review
from .serializers import (
    BookListSerializer, BookDetailSerializer,
    CategorySerializer, AuthorSerializer, ReviewSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BookDetailSerializer
        return BookListSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        
        # Category filter
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            
        # Author filter
        author_slug = self.request.query_params.get('author')
        if author_slug:
            queryset = queryset.filter(author__slug=author_slug)
            
        # Search query
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(title__icontains=search_query) | queryset.filter(author__name__icontains=search_query)
            
        # Price filtering
        max_price = self.request.query_params.get('max_price')
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        # Binding filter
        binding = self.request.query_params.get('binding')
        if binding:
            queryset = queryset.filter(binding__iexact=binding)

        # Publisher filter
        publisher = self.request.query_params.get('publisher')
        if publisher:
            queryset = queryset.filter(publisher__iexact=publisher)

        # Translator filter
        translator = self.request.query_params.get('translator')
        if translator:
            queryset = queryset.filter(translator__iexact=translator)

        # Language filter
        language = self.request.query_params.get('language')
        if language:
            queryset = queryset.filter(language__iexact=language)
            
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_review(self, request, id=None):
        book = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, book=book)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
