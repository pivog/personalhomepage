"""
WSGI config for personalhomepage project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
import sys


sys.path.append('/var/www/html/personalhomepage')
sys.path.append('/var/www/html/personalhomepage/personalhomepage')


from django.core.wsgi import get_wsgi_application




os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'personalhomepage.settings')

application = get_wsgi_application()
