from google.appengine.api import urlfetch
from bs4 import BeautifulSoup
import urllib
import logging

logger = logging.getLogger(__name__)

def get_search():
    html = urlfetch.fetch("http://websoc.reg.uci.edu").content
    return BeautifulSoup(html).find('form', action='http://websoc.reg.uci.edu/perl/WebSoc')

def get_listing(form_data):
    encoded = urllib.urlencode(form_data)
    html = urlfetch.fetch("http://websoc.reg.uci.edu",
        payload=encoded,
        method=urlfetch.POST,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}).content
    return BeautifulSoup(html).find('div', 'course-list')