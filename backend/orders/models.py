from django.db import models
from django.contrib.auth.models import User
from books.models import Book

class Order(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Paid', 'Paid'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    )
    
    PAYMENT_CHOICES = (
        ('click', 'Click'),
        ('payme', 'Payme'),
        ('uzum', 'Uzum Bank'),
    )

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField()
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    shipping_price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='click')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    
    # Gifting options
    is_gift = models.BooleanField(default=False)
    gift_recipient_name = models.CharField(max_length=150, blank=True, null=True)
    gift_recipient_phone = models.CharField(max_length=50, blank=True, null=True)
    gift_note = models.TextField(blank=True, null=True)
    gift_wrap = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.first_name} {self.last_name} ({self.status})"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.book.title} in Order #{self.order.id}"
