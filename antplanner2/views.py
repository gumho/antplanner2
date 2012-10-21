from antplanner2 import app
from flask import flash, render_template, request
from google.appengine.api import urlfetch
from bs4 import BeautifulSoup
import logging
import urllib

logging.basicConfig()
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/websoc/search', methods=['GET'])
def websoc_search_form():
    html = urlfetch.fetch("http://websoc.reg.uci.edu").content
    form_html = BeautifulSoup(html).find('form', action='http://websoc.reg.uci.edu/perl/WebSoc')
    return render_template('websoc/search.html', form=form_html)

@app.route('/websoc/search', methods=['POST'])
def websoc_search():
    encoded = urllib.urlencode(request.form)

    html = urlfetch.fetch("http://websoc.reg.uci.edu",
        payload=encoded,
        method=urlfetch.POST,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}).content

    listing_html = BeautifulSoup(html).find('div', 'course-list')
    return render_template('websoc/listing.html', listing=listing_html)

@app.route('/test')
def qunit():
    return render_template('test.html')