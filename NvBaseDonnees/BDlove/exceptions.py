# Fichier Exceptions

#	1000 : "Incorrect mail or password in login attempt.",
#	1001 : "You have tried to add one user which already exists.",
#	1002 : "You've tried to create a new user with an incorrect tel or mail",
#	1003 : "The user you've searched doesn't exist",
#	1004 : "Unable to create the event",
#       1005 :  "cet evenement n'existe pas"
#       1006 : "L'utilisateur avec cet identifiant n'existe pas, le participant n'a donc pas ete ajoute mais l'evnemenest cree"
#       1007 : "Interdiction d'acces aux donnees de geolocalisation"
#	2001 : "Not an email while an email was requiered",
#	2000 : "Unable to create the user database"
#   2002 : "Ce n'est pas un numero de telephone"

dico_exception_avec_var={1003 :"L'utilisateur que vous cherchez n'existe pas", 2001: "ce n'est pas un email", 2002 : "Ce n'est pas un numero de telephone",1006:"L'utilisateur avec cet identifiant n'existe pas, le participant n'a donc pas ete ajoute mais l'evenement est cree", 1005:"cet evenement n'existe pas", 1007:"Interdiction d'acces aux donnees de geolocalisation"}

dico_exception_sans_var={1002: "Vous avez essayez de creer un utilisateur avec un mauvais email ou mot de passe", 1001: "Vous avez essayez de creer un utilisateur qui existe deja", 1000: "Mauvais mot de passe ou email", 1004: "Impossible de creer un evenement", 2000: "Impossible de creer l'utilisateur dans la base de donnees"}


class Exception_avec_var(Exception):
	def __init__(self, numero_exception, valeur0):
		self.numero = numero_exception
		self.valeur = valeur0 #string

	def numero(self):
		return self.numero

	def valeur(self):
		return self.valeur

	def message_exception(self):
		return dico_exception_avec_var[self.numero]

	def __str__(self):
		return "Erreur numero {} : {}, valeur erronee : {}".format(self.numero, dico_exception_avec_var[self.numero], self.valeur)
		
class Exception_sans_var(Exception):
	def __init__(self, numero_exception):
		self.numero = numero_exception

	def numero(self):
		return self.numero

	def message_exception(self):
		return dico_exception_sans_var[self.numero]

	def __str__(self):
		return "Erreur numero {} : {}".format(self.numero, dico_exception_sans_var[self.numero])
		
class Exception_participant(Exception):
	def __init__(self, numero_exception,valeur_identifiant):
		self.numero = numero_exception #forcément 1005
		self.valeur_id = valeur_identifiant
		
	def numero(self):
		return self.numero

	def valeur(self):
		return self.valeur_id

	def message_exception(self):
		return dico_exception_avec_var[self.numero]

	def __str__(self):
		return "Erreur numero {} : {}, valeur erronee : {}".format(self.numero, dico_exception_avec_var[self.numero],self.valeur_id)
		


