from django.db import models

class Student(models.Model):
    enrollment_number = models.CharField(
        max_length=20,
        primary_key=True
    )

    name = models.CharField(
        max_length=100
    )

    contact_info = models.TextField(
        null=False,
        blank=False
    )

    phone_number = models.CharField(
        max_length=15
    )

    email = models.EmailField(
        unique=True
    )

    def __str__(self):
        return f"{self.enrollment_number} - {self.name}"
