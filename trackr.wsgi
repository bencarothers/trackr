#!/usr/bin/python

import sys
sys.path.insert(0,"/var/www/trackr/server/")
import logging
from trackr import app as application

logging.basicConfig(stream=sys.stderr)
application.secret_key = 'barryallen'
