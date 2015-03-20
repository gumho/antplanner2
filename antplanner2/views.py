from antplanner2 import app, websoc
from flask import render_template, request, jsonify
from google.appengine.api import memcache
from google.appengine.ext import db
import logging
from os import environ as env

LOG = logging.getLogger(__name__)
dev_mode = env.get('SERVER_SOFTWARE', '').startswith('Development')
use_memcache = env['USE_MEMCACHE'].lower() == 'true'

@app.route('/')
def index():
    index_html = memcache.get('index')
    if not index_html:
        index_html = render_template('index.html')
        if use_memcache:
            memcache.add('index', index_html, 60 * 60 * 24)
    return index_html


@app.route('/websoc/search', methods=['GET'])
def websoc_search_form():
    form_html = memcache.get('search')
    if not form_html:
        form_html = websoc.get_search()
        if use_memcache:
            memcache.add('search', form_html, 60 * 60 * 24)

    return render_template('websoc/search.html', form_content=form_html)


@app.route('/websoc/search', methods=['POST'])
def websoc_search():
    key = str(request.form)
    listing_html = memcache.get(key)
    if not listing_html:
        listing_html = websoc.get_listing(request.form)
        if use_memcache:
            memcache.add(key, listing_html, 60 * 60 * 24)
    return render_template('websoc/listing.html', listing=listing_html)


@app.route('/schedules/add', methods=['POST'])
def save_schedule():
    username = request.form.get('username')
    data = request.form.get('data')
    try:
        Schedule(key_name=username, data=data).put()
        return jsonify(success=True)
    except:
        return jsonify(success=False)


@app.route('/schedule/load')
def load_schedule():
    username = request.args.get('username')
    schedule = Schedule.get_by_key_name(username)
    if schedule:
        return jsonify(success=True, data=schedule.data)
    else:
        return jsonify(success=False)


@app.route('/test')
def qunit():
    return render_template('test.html')

#
# Jinja2 globals
#
app.jinja_env.globals['dev_mode'] = dev_mode


#
# Models
#
class Schedule(db.Model):
    data = db.TextProperty(required=True)
    modified_at = db.DateProperty(required=True, auto_now=True)
