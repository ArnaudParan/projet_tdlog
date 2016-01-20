from django.db import models

class Utilisateur(models.Model):
   
    mdp_hashe = models.CharField(max_length=500)
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    numero_tel = models.CharField(max_length=12)
    email = models.CharField(max_length=100)
    possede_appli = models.BooleanField() 
    position_actuelle_lat = models.FloatField(null=True, blank=True)
    position_actuelle_long = models.FloatField(null=True, blank=True)
    derniere_position_lat = models.FloatField(null=True, blank=True)
    derniere_position_long = models.FloatField(null=True, blank=True)
    temps_position_active = models.PositiveIntegerField(default=60) # Temps en MIN au bout duquel la position se deactive automatiquement
    amis = models.ManyToManyField('Utilisateur', blank=True)

    def __str__(self):
        str_id = "id : {} \n/".format(self.id)
        str_prenom = "prenom : {} \n/".format(self.prenom)
        str_nom = "nom : {} \n/".format(self.nom)
        str_numero_tel = "numero_tel : {} \n/".format(self.numero_tel)
        str_possede_appli = "possede_appli : {} \n/".format(self.possede_appli)
        str_position = "position : {} {} \n/".format(self.position_actuelle_lat, self.position_actuelle_long)
        str_ancienne_position = "position_actuelle_long : {} \n/".format(self.position_actuelle_long)
        str_derniere_position_lat = "derniere_position_lat : {} \n/".format(self.derniere_position_lat)
        return str_id + str_prenom +str_nom + str_numero_tel

class Evenement(models.Model):
    nom = models.CharField(max_length=200)
    date = models.DateTimeField() # une date et une heure représentée en Python par une instance de datetime.datetime
    adresse = models.CharField(max_length=1000, null=True, blank=True)
    lieu_geo_lat = models.FloatField()
    lieu_geo_long = models.FloatField()
    temps_rappel = models.PositiveIntegerField(default=15) # durée en MIN!! 
    #temps_rappel min avant l'heure de l'evenement, il rappelle a tous les utilisateurs qu'ils ont un evenement et leur demande le droit d'activer leur position
    createur = models.ForeignKey('Utilisateur', related_name = 'topic_createur')
    participants = models.ManyToManyField('Utilisateur')

    def __str__(self):
        str_id = "id : {} \n/".format(self.id)
        str_nom = "nom : {} \n/".format(self.nom)
        str_date = "date : {} \n/".format(self.date)
        str_adresse = "adresse : {} \n/".format(self.adresse)
        return str_id+str_nom+str_date
