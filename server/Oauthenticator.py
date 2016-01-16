class OAuthenticator:
	#Is this from Google, facebook, or Twitter?
	def __init__(self, username, email, provider):
		self.username = username
		self.email = email
		self.provider = provider

	def checkUnique(self, entry, field):
		"""
		TODO: EDIT THIS COMMENTED OUT LINE TO QUERY TRACKR API AS OPOSSED TO HAVING A DIRECT TIE TO THE DATABASE
		"""
#		exists = User.objects.filter(**{field : entry})
		if exists:
			return False
		else:
			return True
	
	def existingUser(self):
		if not self.checkUnique(self.username, "username") and not self.checkUnique(self.email, "email"):
			return True
		else:
			return False

