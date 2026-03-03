from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('enrollment_number', 'name', 'email', 'phone_number')
    search_fields = ('enrollment_number', 'name', 'email')