import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from books.models import Category, Author, Book, Review

class Command(BaseCommand):
    help = "Seeds the database with luxury-themed Qamar bookstore categories, authors, books, and an admin user."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Qamar Database...")

        # Create/Update Admin Superuser
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@qamar.uz", "admin123")
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created with password: 'admin123'"))

        # Delete old entries to avoid duplicate constraints
        Book.objects.all().delete()
        Author.objects.all().delete()
        Category.objects.all().delete()

        # 1. Create Categories
        cats_data = [
            {"name": "Diniy adabiyotlar", "slug": "diniy", "description": "Qalblar xotirjamligi va ruhiy kamolot manbalari"},
            {"name": "Shaxsiy Rivojlanish", "slug": "shaxsiy-rivojlanish", "description": "Kuchsiz odatlardan qutulish va yangi cho'qqilar"},
            {"name": "Biznes", "slug": "biznes", "description": "Muvaffaqiyatli tadbirkorlik va moliya sirlari"},
            {"name": "Tarix", "slug": "tarix", "description": "O'tmish saboqlari va buyuk siymolar hayoti"},
        ]
        
        categories = {}
        for c in cats_data:
            cat = Category.objects.create(**c)
            categories[c["slug"]] = cat

        # 2. Create Authors
        authors_data = [
            {"name": "Imom al-Buxoriy", "slug": "imom-al-buxoriy", "bio": "Islom olamining buyuk muhaddisi, hadis ilmi peshvosi.", "birth_year": 810, "death_year": 870},
            {"name": "Stephen Covey", "slug": "stephen-covey", "bio": "Amerikalik mashhur muallif, shaxsiy rivojlanish va boshqaruv mutaxassisi.", "birth_year": 1932, "death_year": 2012},
            {"name": "James Clear", "slug": "james-clear", "bio": "Mashhur yozuvchi, odatlar va unumdorlik bo'yicha ekspert.", "birth_year": 1986},
            {"name": "Robert Kiyosaki", "slug": "robert-kiyosaki", "bio": "Moliyaviy savodxonlik sohasidagi eng yirik yozuvchi, investor.", "birth_year": 1947},
            {"name": "Amir Temur", "slug": "amir-temur", "bio": "Buyuk sarkarda, qudratli temuriylar davlati asoschisi.", "birth_year": 1336, "death_year": 1405},
        ]
        
        authors = {}
        for a in authors_data:
            auth = Author.objects.create(**a)
            authors[a["slug"]] = auth

        # 3. Create Books
        books_data = [
            {
                "title": "Al-Jome' as-Sahih (1-jild)",
                "slug": "al-jome-as-sahih-1",
                "author": authors["imom-al-buxoriy"],
                "category": categories["diniy"],
                "sku": "QMR-BK-001",
                "description": "Buyuk muhaddis Imom al-Buxoriy bobomizning shoh asari bo'lmish 'Al-Jome' as-sahih' kitobi islom olamida Qur'oni karimdan keyingi eng sahih manba sanaladi.",
                "price": 180000.00,
                "old_price": 210000.00,
                "rating": 5.0,
                "stock": 12,
                "cover_image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
                "page_count": 640,
            },
            {
                "title": "Muvaffaqiyatli insonlarning 7 ko'nikmasi",
                "slug": "7-konikma",
                "author": authors["stephen-covey"],
                "category": categories["shaxsiy-rivojlanish"],
                "sku": "QMR-BK-002",
                "description": "Dunyodagi eng ko'p sotilgan shaxsiy rivojlanish kitoblaridan biri. Stephen Covey odatlar va ularni muvaffaqiyatga yo'naltirish to'g'risida chuqur tahliliy falsafani yozadi.",
                "price": 52000.00,
                "old_price": 65000.00,
                "rating": 4.9,
                "stock": 25,
                "cover_image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300",
                "page_count": 480,
            },
            {
                "title": "Atom Odatlar (Atomic Habits)",
                "slug": "atom-odatlar",
                "author": authors["james-clear"],
                "category": categories["shaxsiy-rivojlanish"],
                "sku": "QMR-BK-003",
                "description": "Har kuni atigi 1 foizga yaxshilanish uzoq muddatda qanchalik ulkan natijalar berishi haqida ilmiy va amaliy kitob. James Clear odatlarni shakllantirish usullarini beradi.",
                "price": 49000.00,
                "rating": 4.8,
                "stock": 30,
                "cover_image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300",
                "page_count": 320,
            },
            {
                "title": "Boy ota, kambag'al ota",
                "slug": "boy-ota-kambagal-ota",
                "author": authors["robert-kiyosaki"],
                "category": categories["biznes"],
                "sku": "QMR-BK-005",
                "description": "Moliya dunyosi, investitsiyalar, pul oqimlari va boy bo'lish sirlari haqida batafsil qo'llanma.",
                "price": 45000.00,
                "rating": 4.7,
                "stock": 18,
                "cover_image": "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=300",
                "page_count": 280,
            },
            {
                "title": "Temur Tuzuklari (Nafis Nashr)",
                "slug": "temur-tuzuklari",
                "author": authors["amir-temur"],
                "category": categories["tarix"],
                "sku": "QMR-BK-006",
                "description": "Sohibqiron Amir Temurning davlat boshqaruvi, harbiy mahorat, siyosat va adolat to'g'risidagi tarixiy qo'llanmasi.",
                "price": 120000.00,
                "old_price": 140000.00,
                "rating": 5.0,
                "stock": 5,
                "cover_image": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300",
                "page_count": 250,
            },
        ]

        for b in books_data:
            Book.objects.create(**b)

        self.stdout.write(self.style.SUCCESS("Database successfully seeded with Qamar bookstore data!"))
