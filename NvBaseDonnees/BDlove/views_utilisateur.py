from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Utilisateur, Evenement
from .accessoires import *
from .exceptions import Exception_sans_var, Exception_avec_var, Exception_participant
#from .var_globales.py import chiperkey


import datetime
import json
import re


def login(request):
    email = request.GET['email']
    hashe = request.GET['mdp_hashe']
  
    try:
        verifie_user(email,hashe)
        return HttpResponse(json.dumps({'resultat':'success'}), content_type='application/json')
    except Exception_sans_var as e:
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e.numero), 'message_erreur':e.message_exception()}), content_type='application/json')
    

def get_user_id(request):
    email = request.GET['email']
    
    try:
        user = get_verifie_email_user(email)
        return HttpResponse(json.dumps({'resultat':'success', 'id':user.id}), content_type='application/json')
   
    except Exception_avec_var as e: #mauvais mail ou pas d'utilisateur 
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e.numero), 'error_message':e.message_exception()}),  content_type='application/json')

def create_user(request):
    nom = request.GET['nom']
    prenom = request.GET['prenom']
    num = request.GET['numero']
    email = request.GET['email']
    pwd = request.GET['mdp']

    try:
        verifie_mail(email)
        verifie_tel(num)
        verifie_inexistant_mail_user(email)
        user = Utilisateur(nom=nom, prenom=prenom, mdp_hashe=pwd, numero_tel=num,email=email, possede_appli=True)
        # TO DO hachage du mdp
        user.save()
        return HttpResponse(json.dumps({'resultat':'success', 'id':user.id}), content_type='application/json')

    except Exception_avec_var as e1: # mauvais mail, mauvais tel, ou email deja existant
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e1.numero), 'error_message':e1.message_exception(), 'error_value': e1.valeur()}), content_type='application/json')


def add_contact(request):
    email = request.GET['email']
    pwd = request.GET['mdp']
    id_ami = request.GET['id_ami']

    try:
        verifie_user(email,pwd)
        user = Utilisateur.objects.filter(email = email).first()
        ami = get_verifie_identifiant_user(id_ami)
        user.amis.add(ami)
        user.nb_amis = user.nb_amis +1
        user.save()
        ami.amis.add(user)
        ami.nb_amis = ami.nb_amis +1
        ami.save()
        return HttpResponse(json.dumps({'result':'success'}), content_type='application/json')
        
    except Exception_sans_var as e1: # mauvais mail et mdp
        return HttpResponse(json.dumps({'result':'fail', 'error':str(e1.numero), 'error_message':e1.message_exception()}), content_type='application/json')

    except Exception_participant as e2: # id-ami faux
        return HttpResponse(json.dumps({'result':'fail', 'error':str(e2.numero), 'error_message':e2.message_exception(), 'valeur erronnee': e2.valeur()}), content_type='application/json')


def activate_geoloc(request):
    email = request.GET['email']
    pwd = request.GET['mdp']  

    try:
        verifie_user(email,pwd)
        user = Utilisateur.objects.filter(email = email).first()
        user.geoloc_active = True
        user.save()
        return HttpResponse(json.dumps({'result':'success'}), content_type='application/json')
           
    except Exception_sans_var as e1: # mauvais mail et mdp
        return HttpResponse(json.dumps({'result':'fail', 'error':str(e1.numero), 'error_message':e1.message_exception()}), content_type='application/json')

def deactivate_geoloc(request):
    email = request.GET['email']
    pwd = request.GET['mdp']  

    try:
        verifie_user(email,pwd)
        user = Utilisateur.objects.filter(email = email).first()
        user.geoloc_active = False
        user.save()
        return HttpResponse(json.dumps({'result':'success'}), content_type='application/json')
           
    except Exception_sans_var as e1: # mauvais mail et mdp
        return HttpResponse(json.dumps({'result':'fail', 'error':str(e1.numero), 'error_message':e1.message_exception()}), content_type='application/json')


def get_geoloc(request):
    email = request.GET['email']
    mdp = request.GET['mdp']
    id_user = request.GET['id_user']

    try:
        verifie_user(email,mdp)
        dico_geoloc = get_verifie_geolocalisation(id_user)
        dico_geoloc["result"]="success"
        return HttpResponse(json.dumps(dico_geoloc), content_type='application/json')

    except Exception_sans_var as e1: # mauvais email et mdp
        return HttpResponse(json.dumps({'result':'fail','error':str(e1.numero), 'error_message':e1.message_exception()}), content_type='application/json')

    except Exception_participant as e2: # pas d'acces a la geoloc
        return HttpResponse(json.dumps({'result':'fail','error':str(e2.numero), 'error_message':e2.message_exception(),'valeur erronnee':e2.valeur()}), content_type='application/json')



