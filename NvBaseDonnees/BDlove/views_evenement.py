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


def create_event(request):
    email = request.GET['email']
    pwd = request.GET['mdp']
    #TODO : rajouter fonction de hachage
    latitude = request.GET['latitude']
    longitude = request.GET['longitude']
    nom = request.GET['nom']
    #date = request.GET['date']
    id_createur = request.GET['id']
    nb_participants = int(request.GET['nb_participants'])

    try:
        verifie_user(email, pwd)
        createur0 = get_verifie_identifiant_user(id_createur)
        evenement = Evenement(nom=nom,date=datetime.datetime.now(),lieu_geo_lat=latitude, lieu_geo_long=longitude,createur=createur0)
        evenement.save() 
        evenement.participants.add(id_createur)
        for j in range(1,nb_participants):
            id_ami = request.GET['ami{}'.format(j)]
            # TO DO si un identifiant participant est faux, le programme s'arrete or on peut ajouter les autres participants
            participant = get_verifie_identifiant_user(id_ami)
            evenement.participants.add(participant) 
        return HttpResponse(json.dumps({'resultat':'success','id_evenement':evenement.id } ), content_type='application/json')
      
    except Exception_sans_var as e: # mauvais mail ou mdp 
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e.numero), 'error_message':e.message_exception()}),  content_type='application/json')
    
    except Exception_avec_var as e2: # mauvais identifiant
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e2.numero), 'error_message':e2.message_exception(), 'error_value': str(e2.valeur()) }),  content_type='application/json')
     
    except Exception_participant as e3: # un ou plusieurs participant n'est pas bon
        return HttpResponse(json.dumps({'resultat':'success','error':str(e3.numero), 'error_message':e3.message_exception(), 'error_value': str(e3.valeur()) }), content_type='application/json')
        # TO DO s'il y a eu plusieurs participants faux comment les afficher tous?



def add_participant(request):
    email = request.GET['email']
    pwd = request.GET['mdp']
    id_participant = request.GET['id_participant']
    id_evenement = request.GET['id_evenement']
    try:
        verifie_user(email,pwd)
        evenement = get_verifie_evenement(id_evenement)
        participant = get_verifie_identifiant_user(id_participant)
        evenement.participants.add(participant)
        evenement.nb_participants = evenement.nb_participants + 1
        evenement.save()
        return HttpResponse(json.dumps({'resultat':'success' } ), content_type='application/json')
    except Exception_sans_var as e: # mauvais mail ou mdp 
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e.numero), 'error_message':e.message_exception()}),  content_type='application/json')
    except Exception_participant as e2: # mauvais identifiant
        return HttpResponse(json.dumps({'resultat':'fail', 'error':str(e2.numero), 'error_message':e2.message_exception(),'error_value': e2.valeur()}),  content_type='application/json')
     

def maj_evenement(request): # recuperer la version du serveur
    email = request.GET['email']
    pwd = request.GET['mdp']
    id_ev = request.GET['id_evenement']
    nom = request.GET['nom']
    # TO DO date
    #adresse = request.GET['adresse']
    lieu_geo_lat = request.GET['latitude']
    lieu_geo_long = request.GET['longitude']
    temps_rappel = request.GET['temps_rappel']
    nb_participants = request.GET['nb_participants']
    donnees_modif = {'result':'success'} # dico initial
    
    try:
        verifie_user(email, pwd)
        evenement = get_verifie_evenement(id_ev)
        donnees_modif={'result':'success'}
        if nom != evenement.nom:
            donnees_modif["nom"] = evenement.nom
        #if adresse != evenement.adresse:
         #   donnees_modif["adresse"] = evenement.adresse
        if float(lieu_geo_lat) != evenement.lieu_geo_lat:
            donnees_modif["lieu_geo_lat"] = evenement.lieu_geo_lat
        if float(lieu_geo_long) != evenement.lieu_geo_long:
            donnees_modif["lieu_geo_long"] = evenement.lieu_geo_long
        if int(temps_rappel) != evenement.temps_rappel:
            donnees_modif["temps_rappel"] = evenement.temps_rappel
        if nb_participants != str(evenement.nb_participants):
            donnees_modif["nb_participants"] = evenement.nb_participants

        # TO DO
        #for j in range(1,nb_participants):
        #    id_participant = request.GET['participant{}'.format(j)]
        #    participant = get_verifie_identifiant_user(id_participant)
        #    # TO DO si un identifiant participant est faux, le programme s'arrete or on peut ajouter les autres participants
        #    evenement.participants.add(participant)
    
        return HttpResponse(json.dumps(donnees_modif), content_type='application/json')

    except Exception_sans_var as e1: # mauvais email et mdp
        return HttpResponse(json.dumps({'result':'fail','error':str(e1.numero), 'error_message':e1.message_exception()}), content_type='application/json')

    except Exception_avec_var as e2: # mauvais id evenement
        return HttpResponse(json.dumps({'result':'fail','error':str(e2.numero), 'error_message':e2.message_exception(), 'error_value':e2.valeur()}), content_type='application/json')


     


#def search_user(request):


#TODO returns an id if exists, and throws a CommonException(1003) if the user does not exist




