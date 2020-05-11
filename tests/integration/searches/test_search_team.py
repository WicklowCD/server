import json

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search


# class TestSearchTeam(BaseTestCase):
#     def test_user_can_create_search_team(self):
#         admin = create_admin_user()
#         token = authenticate_user(admin)
#         search = create_search()
#         with self.client:
#             res = self.client.post(
#                 f'/searches/{search.uuid}/teams',
#                 data=json.dumps({
#                     'team_leader': 'Team Leader',
#                     'medic': 'Team Medic',
#                     'responder_1': 'First Responder',
#                     'responder_2': 'Second Responder',
#                     'responder_3': 'Third Responder',
#                 }),
#                 content_type='application/json',
#                 headers={'Authorization': f'Bearer {token}'}
#             )
#
#             self.assertEqual(201, res.status_code)
