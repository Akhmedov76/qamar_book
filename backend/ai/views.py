from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from books.models import Book
from books.serializers import BookListSerializer

class AiRecommendationView(APIView):
    """
    Intelligent Book Assistant API.
    Scores and ranks books matching a query (e.g. 'Atomic Habits kabi', 'Tadbirkorlik haqida').
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        query = request.data.get('query', '').lower()
        if not query:
            return Response({"response": "Iltimos, tavsiya olish uchun biror mavzu kiriting.", "books": []})

        books = Book.objects.all()
        scored_books = []

        # List of keywords for category matching
        keywords = {
            'diniy': ['islom', 'iymon', 'diniy', 'namoz', 'sahih', 'buxoriy', 'qalb', 'ghazoliy', 'hadis'],
            'shaxsiy': ['odat', 'habits', 'rivojlanish', 'shaxsiy', 'covey', 'clear', 'diqqat', 'diqqatni', 'work'],
            'biznes': ['tadbirkor', 'tadbirkorlik', 'biznes', 'pul', 'investitsiya', 'boy', 'kiyosaki', 'moliya'],
            'tarix': ['tarix', 'tuzuklar', 'temur', 'temuriy', 'amir', 'o\'tmish'],
        }

        # Determine target categories based on query words
        target_slugs = []
        for slug, kw_list in keywords.items():
            if any(kw in query for kw in kw_list):
                target_slugs.append(slug)

        for book in books:
            score = 0
            # Title matches
            title_words = book.title.lower().split()
            for w in title_words:
                if w in query:
                    score += 5
            
            # Author matches
            if book.author.name.lower() in query:
                score += 4
                
            # Category match
            if book.category.slug in target_slugs:
                score += 8
                
            # Rating weight
            score += book.rating * 0.5
            
            scored_books.append((book, score))

        # Sort books by score descending
        scored_books.sort(key=lambda x: x[1], reverse=True)
        top_books = [item[0] for item in scored_books[:3] if item[1] > 1.0]

        # In case no matches, return top rated books
        if not top_books:
            top_books = list(Book.objects.order_by('-rating')[:3])

        # Formulate luxury assistant responses
        if any(w in query for w in ['habits', 'odat', 'shaxsiy']):
            response_text = "Sizga shaxsiy rivojlanish va oʻz-oʻzini tarbiyalash boʻyicha Qamar kutubxonasidagi quyidagi durdonalarni tavsiya qilaman:"
        elif any(w in query for w in ['tadbirkor', 'biznes', 'pul']):
            response_text = "Moliya, biznes yuritish va tadbirkorlik sohasidagi eng sara bilimlarni quyidagi asarlardan topishingiz mumkin:"
        elif any(w in query for w in ['diniy', 'islom', 'hadis']):
            response_text = "Ruh va qalb ma'rifati uchun quyidagi mo'tabar diniy manbalarni tavsiya etaman:"
        else:
            response_text = "Siz kiritgan soʻrov boʻyicha Qamar premium kutubxonasidan quyidagi asarlarni tanladim:"

        serializer = BookListSerializer(top_books, many=True)

        return Response({
            "response": response_text,
            "books": serializer.data
        })
