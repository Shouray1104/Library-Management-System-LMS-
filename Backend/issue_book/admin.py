from django.contrib import admin
from .models import IssueBook


@admin.register(IssueBook)
class IssueBookAdmin(admin.ModelAdmin):
    list_display = (
        'student',
        'book',
        'issue_date',
        'due_date',
        'returned',
        'fine_amount',
        'is_delayed'
    )

    readonly_fields = ('due_date', 'return_date', 'fine_amount')