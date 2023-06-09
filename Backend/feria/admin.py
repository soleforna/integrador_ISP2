from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from .models import *

@admin.register(Client) # Decorador que registra la clase CustomUser en el panel de administración
class ClientAdmin(UserAdmin): # Clase que hereda de UserAdmin
    model = Client # Modelo que se va a administrar
    fieldsets = ( # Campos que se van a mostrar en el panel de administración
        (None, {'fields': ('email', 'password')}), 
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone', 'address', 'avatar')}), 
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = ( # Campos que se van a mostrar en el panel de administración al momento de crear un nuevo usuario
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'last_login', 'is_staff') # Campos que se van a mostrar en la lista de usuarios
    search_fields = ('email', 'first_name', 'last_name') # Campos por los que se va a poder buscar
    ordering = ('email',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('name', 'created_at')
    
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'description', 'price', 'stock', 'created_at', 'get_reviews_count')
    search_fields = ('name', 'category')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('name', 'created_at')

    def get_reviews_count(self, obj):
        return obj.review.count()
    get_reviews_count.short_description = 'Cantidad de Reseñas'
    
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('client', 'description', 'created_at')
    search_fields = ('client', 'description')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('client', 'created_at')

@admin.register(Coment)
class ComentAdmin(admin.ModelAdmin):
    list_display = ('client', 'description', 'created_at')
    search_fields = ('client', 'description')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('client', 'created_at')
