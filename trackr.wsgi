#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/trackr/server/")

from trackr import app as application
application.secret_key = 'barryallen'
