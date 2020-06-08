import json

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search


class TestTechnicalTeam(BaseTestCase):
    def test_user_can_create_technical_team(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        with self.client:
            res = self.client.post(
                f'/searches/{search.uuid}/technical',
                data=json.dumps({
                    'name': 'WW Drone',
                    'equipment_type': 'drone',
                    'member_1': 'Pilot',
                    'member_2': 'Camera Operator',
                    'member_3': 'Spotter',
                    'notes': 'Used 30x zoom as well as thermal imaging. Trainee 1 and Trainee 2 were present for spotter training'
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assertEqual(201, res.status_code)
