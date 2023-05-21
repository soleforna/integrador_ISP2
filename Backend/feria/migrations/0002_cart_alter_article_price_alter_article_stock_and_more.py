# Generated by Django 4.2 on 2023-05-21 01:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feria', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('confirm', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='article',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='article',
            name='stock',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='client',
            name='address',
            field=models.CharField(max_length=100),
        ),
        migrations.CreateModel(
            name='CartDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feria.cart')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='feria.article')),
            ],
        ),
        migrations.AddField(
            model_name='cart',
            name='client',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='feria.client'),
        ),
        migrations.AddField(
            model_name='cart',
            name='products',
            field=models.ManyToManyField(through='feria.CartDetail', to='feria.article'),
        ),
    ]