# Generated by Django 4.2.1 on 2023-06-04 22:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feria', '0004_alter_review_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='Coment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=140)),
                ('classification', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(5)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feria.client')),
            ],
        ),
    ]