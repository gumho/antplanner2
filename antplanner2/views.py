from antplanner2 import app
from antplanner2 import models, websoc
from flask import flash, render_template, request, jsonify
from google.appengine.api import memcache
import logging

logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/websoc/search', methods=['GET'])
def websoc_search_form():
    form_html = memcache.get('search')
    if not form_html:
        form_html = unicode(websoc.get_search().encode(formatter='html'))
        memcache.add('search', form_html, 60 * 60 * 24)

    return render_template('websoc/search.html', form=form_html)

@app.route('/websoc/search', methods=['POST'])
def websoc_search():
    key = str(request.form)
    listing_html = memcache.get(key)
    if not listing_html:
        listing_html = unicode(websoc.get_listing(request.form).encode(formatter='html'))
        memcache.add(key, listing_html, 60 * 60 * 24)
    return render_template('websoc/listing.html', listing=listing_html)

@app.route('/test')
def qunit():
    return render_template('test.html')

# @app.route('/schedules/add', methods=['POST'])
# def add_schedule():
#     username = request.form.get('username')
#     event_content = request.form.get('events')
#     schedule = models.Schedule(username=username, content=event_content)
#     schedule.put()
#     return jsonify(id=schedule.key.id())

# @app.route('/schedules/<int:id_>')
# def show_schedule(id_):
#     content = models.Schedule.get_by_id(id_).content
#     return render_template('index.html', x=content)
