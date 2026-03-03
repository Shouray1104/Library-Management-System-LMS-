from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        'book_id',
        'name',
        'writer_name',
        'total_copies',
        'available_copies'
    )
    search_fields = ('book_id', 'name', 'writer_name')