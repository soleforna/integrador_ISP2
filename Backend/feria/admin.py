from django.contrib import admin
import feria.models as models

# Register your models here.
@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description','status', 'created_at')
    search_fields = ('name', 'description')

@admin.register(models.Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'stock', 'image', 'status', 'created_at')
    search_fields = ('name', 'description', 'price', 'stock', 'image')

@admin.register(models.Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'lastname', 'email', 'phone', 'address', 'status', 'created_at')
    search_fields = ('name', 'lastname', 'email', 'phone', 'address')

@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('article', 'client', 'description', 'status', 'created_at')
    search_fields = ('article', 'client', 'description')
    

@admin.register(models.Sale)
class SalesAdmin(admin.ModelAdmin):
    list_display = ('get_articles', 'created_at')
    search_fields = ('client', 'articles')
    
