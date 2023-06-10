from django.apps import AppConfig


class FeriaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'feria'

    def ready(self):
        import feria.signals  # Importa las señales
