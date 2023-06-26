# Generated by Django 4.2.1 on 2023-06-25 17:14

from django.db import migrations, models
import feria.validators


class Migration(migrations.Migration):

    dependencies = [
        ('feria', '0002_alter_newsletter_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='first_name',
            field=models.CharField(blank=True, max_length=30, null=True, validators=[feria.validators.name_valid]),
        ),
    ]
