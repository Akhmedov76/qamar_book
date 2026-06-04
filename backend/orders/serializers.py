from rest_framework import serializers
from .models import Order, OrderItem
from books.models import Book
from books.serializers import BookListSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    book_details = BookListSerializer(source='book', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_details', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'first_name', 'last_name', 'email', 'address', 'total_price', 'shipping_price', 
            'payment_method', 'status', 'items', 'created_at',
            'is_gift', 'gift_recipient_name', 'gift_recipient_phone', 'gift_note', 'gift_wrap'
        ]
        read_only_fields = ['status', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Instantiate base Order model
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            book = item_data['book']
            qty = item_data['quantity']
            price = item_data['price']
            
            # Reduce product inventory stock
            if book.stock >= qty:
                book.stock -= qty
                book.save()
            
            # Create OrderItem entry
            OrderItem.objects.create(order=order, book=book, quantity=qty, price=price)
            
        return order
