from .models import Utilisateur,Evenement
from .exceptions import Exception_sans_var, Exception_avec_var,Exception_participant
import re

def verifie_user(mail, mdp):
    user = Utilisateur.objects.filter(email=mail, mdp_hashe=mdp).first()
    if user is None:
        raise Exception_sans_var(1000)

def verifie_mail(email):
    reg = r'^[A-Za-z0-9]+([_|\.|-]{1}[A-Za-z0-9]+)*@[A-Za-z0-9]+([_|\.|-]{1}[A-Za-z0-9]+)*[\.]{1}[a-z]{2,6}$'
    if re.match(reg,email) is  None:
        raise Exception_avec_var(2001, email)


def verifie_tel(numero):
    reg =r'^0[0-9]([ .-]?[0-9]{2}){4}$'
    #reg =r'^\+?[03]3?[ .-]?[0-9]([ .-]?[0-9]{2}){4}$'
    if re.match(reg,numero) is None:
        raise Exception_avec_var(2002, numero)

def get_verifie_identifiant_user(identifiant):
    user = Utilisateur.objects.filter(id = identifiant).first()
    if user is None:
        raise Exception_participant(1006,identifiant)
    else:
        return user

def get_verifie_email_user(email):
    verifie_mail(email)
    user = Utilisateur.objects.filter(email = email).first()
    if user is None:
        raise Exception_avec_var(1003,email)
    else:
        return user

def verifie_inexistant_mail_user(email):
    user = Utilisateur.objects.filter(email = email).first()
    if user is not None:
        raise Exception_avec_var(1001, email)

def get_verifie_evenement(id_evenement):
    evenement = Evenement.objects.filter(id =id_evenement).first()
    if evenement is None:
        raise Exception_participant(1005,id_evenement)
    else:
        return evenement

def get_verifie_geolocalisation(id_user):
    user = get_verifie_identifiant_user(id_user)
    if (not user.geoloc_active): #or (user.position_actuelle_lat is None) or(user.position_actuelle_long is None):
        # bien penser a checker les is None
        raise Exception_participant(1007, id_user)
    else:
        dico_geo = {'latitude':user.position_actuelle_lat, 'longitude':user.position_actuelle_long}
        return dico_geo

