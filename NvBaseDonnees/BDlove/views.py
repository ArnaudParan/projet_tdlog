from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Utilisateur,Evenement
from .accessoires import is_user

import datetime
import json

def index(request):
    return HttpResponse("Hello, world. You are so beautiful")


def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)


def fbview(request):
  
    return HttpResponse(json.dumps({'foo': 'bar', 'hello': 'world'}), content_type='application/json')


def home(request):
    string = request.GET['name']
    return HttpResponse("Bonjour %s!" % string)

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
        #return HttpResponse("Bonjour %s!" evenement.id)
        
    else: 
        return HttpResponse(json.dumps({'resultat':'fail', 'error':'1002', 'message_erreur':'t\'existes pas tu peux pas créer d\'évènement bolosse'}),  content_type='application/json')

