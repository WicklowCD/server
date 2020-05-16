import json

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search, create_search_team


class TestSearchTeam(BaseTestCase):
    def test_user_can_create_search_team(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        with self.client:
            res = self.client.post(
                f'/searches/{search.uuid}/teams',
                data=json.dumps({
                    'team_leader': 'Team Leader',
                    'medic': 'Team Medic',
                    'responder_1': 'First Responder',
                    'responder_2': 'Second Responder',
                    'responder_3': 'Third Responder',
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assertEqual(201, res.status_code)

    def test_user_can_view_a_list_of_search_teams(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        with self.client:
            team_res = self.client.post(
                f'/searches/{search.uuid}/teams',
                data=json.dumps({
                    'team_leader': 'Team Leader',
                    'medic': 'Team Medic',
                    'responder_1': 'First Responder',
                    'responder_2': 'Second Responder',
                    'responder_3': 'Third Responder',
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )
            team = json.loads(team_res.data.decode())

            res = self.client.get(
                f'/searches/{search.uuid}/teams',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertIn(team['id'], data[0]['uuid'])

    def test_user_can_update_a_specific_saerch_team(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        search_team = create_search_team(search)

        with self.client:
            res = self.client.put(
                f'/searches/{search.uuid}/teams/{search_team.uuid}',
                data=json.dumps({
                    'name': search_team.name,
                    'team_leader': search_team.team_leader,
                    'medic': 'Test Medic',
                    'responder_1': search_team.responder_1,
                    'responder_2': search_team.responder_2,
                    'responder_3': search_team.responder_3,
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assertEqual(202, res.status_code)