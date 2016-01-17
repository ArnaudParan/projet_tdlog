from django.contrib import admin

from .models import Utilisateur,Evenement

@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ('identifiant', 'nom', 'prenom', 'numero_tel', 'email', 'possede_appli')

@admin.register(Evenement)
class EvenementAdmin(admin.ModelAdmin):
    list_display = ('identifiant', 'nom', 'date', 'adresse', 'lieu_geo_lat', 'lieu_geo_long')
