import json

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search


class TestCommsLog(BaseTestCase):
    def test_user_can_create_comms_log_entry(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()

        with self.client:
            res = self.client.post(
                f'/searches/{search.uuid}/logs/comms',
                data=json.dumps({
                    'time': '12:00',
                    'call_sign': 'WW01',
                    'message': 'Test Message',
                    'action': 'No Action Required',
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assertEqual(201, res.status_code)
