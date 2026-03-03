from django.db import models

class Book(models.Model):
    book_id = models.CharField(
        max_length=20,
        primary_key=True
    )

    name = models.CharField(
        max_length=200
    )

    writer_name = models.CharField(
        max_length=150
    )

    total_copies = models.PositiveIntegerField(
        null=False,
        default=1
    )

    available_copies = models.PositiveIntegerField(
        null=False,
        default=1
    )

    def save(self, *args, **kwargs):
        # When book is first created, available copies = total copies
        if not self.available_copies:
            self.available_copies = self.total_copies
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.book_id} - {self.name}"