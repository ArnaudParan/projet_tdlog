from django.db import models

class Utilisateur(models.Model):
    identifiant = models.CharField(max_length = 15)
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100, blank=True)
    numero_tel = models.CharField(max_length=10) 
    possede_appli = models.BooleanField()
    position_actuelle_lat = models.FloatField(null=True, blank=True)
    position_actuelle_long = models.FloatField(null=True, blank=True)
    derniere_position_lat = models.FloatField(null=True, blank=True) 
    derniere_position_long = models.FloatField(null=True, blank=True) 
    temps_position_active = models.PositiveIntegerField(default=60) # Temps en MIN au bout duquel la position se deactive automatiquement

    def __str__(self):
        return self.identifiant

class Evenement(models.Model):
    identifiant = models.CharField(max_length = 10)
    #date = models.DateTimeField(verbose_name = "date de l'evenement")
    adresse = models.CharField(max_length=200, null=True, blank=True)
    lieu_geo_lat = models.FloatField()
    lieu_geo_long = models.FloatField()
    temps_rappel = models.PositiveIntegerField(default=15) # durée en MIN!! 
    #temps_rappel min avant l'heure de l'evenement, il rappelle a tous les utilisateurs qu'ils ont un evenement et leur demande le droit d'activer leur position
    createur = models.ForeignKey(Utilisateur, related_name = 'topic_createur')
    participants = models.ManyToManyField(Utilisateur)

    def __str__(self):
        return self.identifiant

#class participe_evenement (models.Model):
#   evenement = models.ForeignKey(Evenement)
#    utilisateur = models.ForeignKey(Utilisateur)

#    def __str__ (self):
#        "{0} participe a {1}".format(self.utilisateur.identifiant, self.evenement.identifiant)

class donnees_perso (models.Model):
    mdp = models.CharField(max_length=10)
    utilisateur = models.ForeignKey(Utilisateur)

    def __str__ (self):
        return utilisateur.identifiant