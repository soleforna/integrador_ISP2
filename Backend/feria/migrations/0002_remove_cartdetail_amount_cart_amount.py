# Generated by Django 4.2.1 on 2023-06-11 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feria', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartdetail',
            name='amount',
        ),
        migrations.AddField(
            model_name='cart',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]