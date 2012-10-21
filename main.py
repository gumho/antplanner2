import sys, os

package_dir_path = os.path.join(os.path.dirname(__file__), 'packages')
sys.path.insert(0, package_dir_path)

from antplanner2 import app
from google.appengine.ext.webapp.util import run_wsgi_app
run_wsgi_app(app)