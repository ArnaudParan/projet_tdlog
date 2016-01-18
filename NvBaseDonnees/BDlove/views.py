from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

from .models import Utilisateur
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
    mdp_hashe = request.GET['mdp_hashe']
    user = Utilisateur.objects.filter(email=email).first()
    if is_user(user,mdp_hashe):
        return HttpResponse(json.dumps({'resultat':'success'}), content_type='application/json')
    else:
        return HttpResponse(json.dumps({'resultat':'fail', 'error':'1000', 'message_erreur':'c\'est du caca'}), content_type='application/json')
    

