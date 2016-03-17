class Config(object):
	DEBUG = False
	GOOGLE_LOGIN_CLIENT_ID = None
	GOOGLE_LOGIN_CLIENT_SECRET = None
	OAUTH_CREDENTIALS = {}

class DevelopmentConfig(Config):

	print ' * loading [DEVELOPMENT] configuration...'
	DEBUG = True

	GOOGLE_LOGIN_CLIENT_ID = "541027712243-n65afuob9r897r4nul26h8jm0rh9c1nc.apps.googleusercontent.com"
	GOOGLE_LOGIN_CLIENT_SECRET = "hcOQCDRvg-pH039DCPMceLzb"

	FACEBOOK_LOGIN_CLIENT_ID = '1541952349452787'
	FACEBOOK_LOGIN_CLIENT_SECRET = '3a71cac2a823a642241ce4a586ba6465'

	OAUTH_CREDENTIALS = {
	'google' : {
	'id' : GOOGLE_LOGIN_CLIENT_ID,
	'secret' : GOOGLE_LOGIN_CLIENT_SECRET
			},
	'facebook' :{
	'id': FACEBOOK_LOGIN_CLIENT_SECRET,
	'secret': FACEBOOK_LOGIN_CLIENT_SECRET
	        }
}