import unittest
from .. import trackr

class BaseTestCase(unittest.TestCase):

    def setUp(self):
        self.test_client = trackr.app.test_client()

    def tearDown(self):
        pass

    def test_base(self):
        response = self.test_client.get('/')
        assert response.status_code == 200
