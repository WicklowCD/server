import json

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search, create_comms_log


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

    def test_user_can_view_list_of_comms_logs(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        log1 = create_comms_log(search)
        log2 = create_comms_log(search)
        log3 = create_comms_log(search)

        with self.client:
            res = self.client.get(
                f'/searches/{search.uuid}/logs/comms',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual(log1.time, data[0]['time'])
            self.assertEqual(log2.message, data[1]['message'])
