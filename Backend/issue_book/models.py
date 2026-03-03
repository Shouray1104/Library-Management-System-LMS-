from django.db import models
from datetime import timedelta
from django.utils import timezone
from students.models import Student
from books.models import Book
from django.core.exceptions import ValidationError


class IssueBook(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )

    issue_date = models.DateField(
        default=timezone.now
    )

    due_date = models.DateField(
        blank=True
    )

    return_date = models.DateField(
        null=True,
        blank=True
    )

    returned = models.BooleanField(
        default=False
    )

    fine_amount = models.PositiveIntegerField(
        default=0
    )

    def clean(self):
        # 🔴 Restrict max 3 books per student
        active_issues = IssueBook.objects.filter(
            student=self.student,
            returned=False
        ).count()

        if active_issues >= 3 and not self.pk:
            raise ValidationError("Student cannot issue more than 3 books.")

        # 🔴 Prevent issuing same book twice
        already_issued = IssueBook.objects.filter(
            student=self.student,
            book=self.book,
            returned=False
        ).exists()

        if already_issued and not self.pk:
            raise ValidationError("This book is already issued to this student.")

        # 🔴 Check if copies available
        if not self.pk and self.book.available_copies <= 0:
            raise ValidationError("No copies available.")

    def save(self, *args, **kwargs):
        self.clean()

        # Set due date automatically
        if not self.due_date:
            self.due_date = self.issue_date + timedelta(days=7)

        # If issuing new book
        if not self.pk:
            self.book.available_copies -= 1
            self.book.save()

        # If returning book
        if self.returned and not self.return_date:
            self.return_date = timezone.now().date()

            # Increase available copies
            self.book.available_copies += 1
            self.book.save()

            # Fine calculation (₹10 per day after due date)
            if self.return_date > self.due_date:
                delay_days = (self.return_date - self.due_date).days
                self.fine_amount = delay_days * 10

        super().save(*args, **kwargs)

    @property
    def is_delayed(self):
        if not self.returned and timezone.now().date() > self.due_date:
            return True
        return False

    def __str__(self):
        return f"{self.student.enrollment_number} - {self.book.name}"