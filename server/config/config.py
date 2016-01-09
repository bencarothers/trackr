class Config(object):
	DEBUG = False
	GOOGLE_LOGIN_CLIENT_ID = None
	GOOGLE_LOGIN_CLIENT_SECRET = None 
	OAUTH_CREDENTIALS = {}

class DevelopmentConfig(Config):

	print 'loading DEV configuration...'
	DEBUG = True

	GOOGLE_LOGIN_CLIENT_ID = "541027712243-n65afuob9r897r4nul26h8jm0rh9c1nc.apps.googleusercontent.com"
	GOOGLE_LOGIN_CLIENT_SECRET = "Xi1lFHp29YGTitiqD7kKWRIn"

	OAUTH_CREDENTIALS = {
	'google' : {
	'id' : GOOGLE_LOGIN_CLIENT_ID,
	'secret' : GOOGLE_LOGIN_CLIENT_SECRET
	}
}
