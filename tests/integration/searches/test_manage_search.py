import json
from datetime import datetime

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search


class TestManageSearch(BaseTestCase):
    def test_admin_can_view_a_search(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        with self.client:
            res = self.client.get(
                f'/searches/{search.uuid}',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual(search.location, data['location'])
            self.assertEqual(search.oic, data['oic'])
