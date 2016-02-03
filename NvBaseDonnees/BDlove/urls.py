from django.conf.urls import url

from . import views_evenement
from . import views_utilisateur

urlpatterns = [

    url(r'^event$', views_evenement.create_event),
    url(r'^add_contact$', views_utilisateur.add_contact),
    url(r'^get_id$',views_utilisateur.get_user_id),
    url(r'^login$', views_utilisateur.login),
    url(r'^create_user$',views_utilisateur.create_user),
    url(r'^activate_geoloc$',views_utilisateur.activate_geoloc),
    url(r'^deactivate_geoloc$', views_utilisateur.deactivate_geoloc),
    url(r'^add_participant$', views_evenement.add_participant),
    url(r'^maj_evenement$',views_evenement.maj_evenement),
    url(r'^get_geoloc$',views_utilisateur.get_geoloc),

]
