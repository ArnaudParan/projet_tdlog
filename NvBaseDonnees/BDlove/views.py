from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Utilisateur,Evenement
from .accessoires import is_user

import datetime
import json
import re


def exists(request):
    email = request.GET['email']
    hashe = request.GET['mdp_hashe']
    if is_user(email,mdp_hashe):
        return HttpResponse(json.dumps({'resultat':'success'}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'resultat':'fail', 'error':'1000', 'message_erreur':'c\'est du caca'}), content_type='application/json')
    
def create_event(request):
    email = request.GET['email']
    pwd = request.GET['mdp']
    #TODO : rajouter fonction de hachage
    latitude = request.GET['latitude']
    longitude = request.GET['longitude']
    nom = request.GET['nom']
    #date = request.GET['date']
    id_createur = request.GET['id']
    createur0=Utilisateur.objects.filter(id=id_createur).first()
    nb_participants = int(request.GET['nb_participants'])
    if is_user(email,pwd):
        evenement=Evenement(nom=nom,date=datetime.datetime.now(),lieu_geo_lat=latitude, lieu_geo_long=longitude,createur=createur0)
        evenement.save() 
        evenement.participants.add(id_createur)
        for j in range(1,nb_participants):
            id_ami = request.GET['ami{}'.format(j)]
            participant = Utilisateur.objects.filter(id=id_ami).first()
            if participant is not None:
                evenement.participants.add(participant) 
        return HttpResponse(json.dumps({'resultat':'success','id_evenement':evenement.id } ), content_type='application/json')
      
        
    else: 
        return HttpResponse(json.dumps({'resultat':'fail', 'error':'1002', 'message_erreur':'t\'existes pas tu peux pas créer d\'évènement bolosse'}),  content_type='application/json')


#def log_user(request):


#def get_user_id(request):

#def search_user(request):
#TODO returns an id if exists, and throws a CommonException(1003) if the user does not exist

#def add_user(request):

def is_mail(request):
    email = request.GET['email']
    reg = r'^[A-Za-z0-9]+([_|\.|-]{1}[A-Za-z0-9]+)*@[A-Za-z0-9]+([_|\.|-]{1}[A-Za-z0-9]+)*[\.]{1}[a-z]{2,6}$'
    if re.match(reg,email) is not None:
         return HttpResponse(json.dumps({'resultat':'success'}), content_type='application/json')  
    else:       
        return HttpResponse(json.dumps({'resultat':'fail','error':'2000','message_erreur':'email non valide'}), content_type='application/json')


def is_tel(request):
    numero = request.GET['num']
    reg =r'^0[0-9]([ .-]?[0-9]{2}){4}$'
    #reg =r'^\+?[03]3?[ .-]?[0-9]([ .-]?[0-9]{2}){4}$'
    if re.match(reg,numero) is not None:
         return HttpResponse(json.dumps({'resultat':'success'}), content_type='application/json')  
    else:       
        return HttpResponse(json.dumps({'resultat':'fail','error':'2000','message_erreur':'numero non valide'}), content_type='application/json')

def add_contact(request):
    
    email = request.GET['email']
    pwd = request.GET['mdp']
    id_ami = request.GET['id_ami']
    ami = Utilisateur.objects.filter(id = id_ami).first()
    if ami is not None:
        if is_user(email,pwd):
            user=Utilisateur.objects.filter(email = email).first()
            user.amis.add(ami)
            return HttpResponse(json.dumps({'resultat':'success'}), content_type='application/json')
        else:
            return HttpResponse(json.dumps({'resultat':'fail', 'error':'1000', 'message_erreur':'tu n\'existes pas'}), content_type='application/json')
    else:
         return HttpResponse(json.dumps({'resultat':'fail', 'error':'1000', 'message_erreur':'utilisateur inconnu'}),content_type='application/json')




