import unittest
from google.appengine.ext import testbed
from antplanner2 import websoc


class WebSoc_Test(unittest.TestCase):
    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_urlfetch_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def test_search_page(self):
        html = websoc.get_search()
        self.assertIn('Display Web Results', html)

if __name__ == '__main__':
    unittest.main()
