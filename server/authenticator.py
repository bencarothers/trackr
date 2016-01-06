from server.models import User

class Authenticator:

	def __init__(self, username, password, email):
		self.username = username
		self.password = password
		self.email = email
		self.error = ""

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
			self.error = "This username is taken. Please try again"
			return False
		if self.checkUnique(self.email, "email"):
			self.error = "This email was already registed with.\nPlease login with the account you have!"
			return False
		return True 
