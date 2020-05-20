import json
from tests.base import BaseTestCase
from tests.utils import create_new_user, create_admin_user, authenticate_user


class TestListUsers(BaseTestCase):
    def test_admin_user_can_view_a_list_of_users(self):
        create_new_user('New', 'User', 'new@user.com', '0831247362', 'testPass123!')
        create_new_user('Old', 'User', 'old@user.com', '0831258762', 'testPass123!!')
        admin = create_admin_user()
        token = authenticate_user(admin)
        with self.client:
            res = self.client.get(
                '/users',
                headers={'Authorization': f'Bearer {token}'}
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual('New', data[0]['first_name'])
            self.assertEqual('User', data[0]['last_name'])

    def test_non_admin_user_can_not_view_list_of_users(self):
        user = create_new_user()
        token = authenticate_user(user)
        with self.client:
            res = self.client.get(
                '/users',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assert403(res)