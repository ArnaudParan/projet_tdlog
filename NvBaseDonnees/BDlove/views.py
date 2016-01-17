from django.shortcuts import render

from django.http import HttpResponse
from django.http import JsonResponse

import datetime
import json

def index(request):
    return HttpResponse("Hello, world. You are so beautiful")


def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)


def fbview(request):
    data = {'foo': 'bar', 'hello': 'world'}
    return HttpResponse(json.dumps(data), content_type='application/json')
