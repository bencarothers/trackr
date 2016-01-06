from server.models import User

class Authenticator:

	def __init__(self, username, password, email = None):
		self.username = username
		self.password = password
		self.email = email
		self.error = None

	def checkUnique(self, entry, field):
		exists = User.objects.filter(**{field : entry})
		if exists:
			return False
		else:
			return True

	def existingUser(self, username, email):
		if not self.checkUnique(username, "username") and not self.checkUnique(email, "email"):
			return True
		else:
			return False

	def validForm(self):
		if self.existingUser(self.username, self.email):
			self.error = "It appears you already registered before!"
			return False
		if self.checkUnique(self.username, "username"):
			self.error = "This username is taken. Please try a new one"
			return False
		if self.checkUnique(self.email, "email"):
			self.error = "This email was already registed with. Please login with the account you have!"
			return False
		return True

		#cursor = db.restaurants.find({"cuisine": "Italian", "address.zipcode": "10075"})
	def validLogin(self):
		real_user = User.objects.filter(**{"username" : self.username, "password" : self.password})
		if real_user:
			return True
		else:
			self.error = "Incorrect password. Try again!"
			return False

