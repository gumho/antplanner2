import main
import unittest
from google.appengine.api import memcache
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

    def test_search_page_cache(self):
        rv = self.app.get('/websoc/search')
        num_items = memcache.get_stats()['items']
        self.assertEqual(num_items, 1)

    def test_listing_page(self):
        pass

    def test_listing_page_cache(self):
        pass

    def test_save_schedule(self):
        pass

    def test_load_schedule(self):
        pass

if __name__ == '__main__':
    unittest.main()
