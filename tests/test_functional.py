import main
import unittest
from google.appengine.ext import testbed

class AntPlannerTestCase(unittest.TestCase):
    def setUp(self):
        # Set up App Engine test bed
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_memcache_stub()
        self.testbed.init_urlfetch_stub()

        # Set up Flask test client
        main.app.config['TESTING'] = True
        self.app = main.app.test_client()

    def tearDown(self):
        self.testbed.deactivate()

    def test_index(self):
        rv = self.app.get('/')
        self.assertIn('Antplanner - A better WebSOC for UCI', rv.data)

    def test_search_page(self):
        rv = self.app.get('/websoc/search')
        self.assertIn('AntPlanner - Search', rv.data)
        self.assertIn('Chemistry', rv.data)

if __name__ == '__main__':
    unittest.main()