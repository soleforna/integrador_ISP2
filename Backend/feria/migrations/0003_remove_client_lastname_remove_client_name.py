# Generated by Django 4.2.1 on 2023-05-29 04:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feria', '0002_client_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='lastname',
        ),
        migrations.RemoveField(
            model_name='client',
            name='name',
        ),
    ]
