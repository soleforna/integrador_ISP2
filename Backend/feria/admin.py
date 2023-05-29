from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('name', 'created_at')
    
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'description', 'price', 'stock', 'created_at')
    search_fields = ('name', 'category')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('name', 'created_at')

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', Client.getEmail, 'phone', 'address', 'created_at')
    search_fields = ('name', Client.getEmail, 'phone', 'address')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('name', 'created_at')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('article', 'client', 'description', 'created_at')
    search_fields = ('article', 'client', 'description')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('article', 'created_at')
