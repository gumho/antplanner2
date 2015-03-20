from google.appengine.api import urlfetch
from bs4 import BeautifulSoup
import urllib
import logging

LOG = logging.getLogger(__name__)


def get_search():
    html = urlfetch.fetch("http://websoc.reg.uci.edu").content
    inner = BeautifulSoup(html, 'lxml').find(
        'form',
        action='http://websoc.reg.uci.edu/perl/WebSoc').renderContents()
    return unicode(inner, errors='ignore')


def get_listing(form_data):
    encoded = urllib.urlencode(form_data)
    html = urlfetch.fetch(
        "http://websoc.reg.uci.edu/perl/WebSoc",
        payload=encoded,
        method=urlfetch.POST,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}).content
    listing = BeautifulSoup(html, 'lxml').find('div', 'course-list')
    if listing:
        return unicode(listing.encode(formatter='html'))
    else:
        # We come here if course-list was not found
        return unicode(BeautifulSoup(html).encode(formatter='html'))
