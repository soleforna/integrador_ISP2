# Generated by Django 4.2.1 on 2023-06-02 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feria', '0002_remove_client_lastname_client_avatar_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='calificacion',
            field=models.IntegerField(choices=[(1, '1 estrella'), (2, '2 estrellas'), (3, '3 estrellas'), (4, '4 estrellas'), (5, '5 estrellas')], default=1),
        ),
    ]
