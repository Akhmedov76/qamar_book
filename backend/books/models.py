from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='authors/', blank=True, null=True)
    birth_year = models.IntegerField(blank=True, null=True)
    death_year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='books')
    sku = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    old_price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    rating = models.FloatField(default=5.0, validators=[MinValueValidator(1.0), MaxValueValidator(5.0)])
    stock = models.PositiveIntegerField(default=10)
    cover_image = models.URLField(max_length=500, blank=True, null=True)  # URL field for easy remote image linking
    page_count = models.PositiveIntegerField(blank=True, null=True)
    language = models.CharField(max_length=50, default="O'zbekcha")
    binding = models.CharField(max_length=50, default="Muqovali")
    published_year = models.IntegerField(blank=True, null=True)
    publisher = models.CharField(max_length=150, blank=True, null=True)
    translator = models.CharField(max_length=150, blank=True, null=True)
    has_preview = models.BooleanField(default=False)
    preview_pages_json = models.TextField(blank=True, null=True, help_text="JSON list of preview page URLs")
    has_ebook = models.BooleanField(default=False)
    ebook_price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    ebook_file_url = models.URLField(max_length=500, blank=True, null=True)
    has_audio = models.BooleanField(default=False)
    audio_price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    audio_file_url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.title

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.TextField()
    quote = models.TextField(blank=True, null=True, help_text="Quote from the book shared by user")
    created_at = models.DateTimeField(auto_now_add=True)
    verified_purchase = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.rating}/5)"
