import json
from tests.base import BaseTestCase
from tests.utils import create_new_user, authenticate_user, create_admin_user


class TestUsers(BaseTestCase):
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

    def test_user_can_view_details_for_a_specific_user(self):
        user = create_new_user('New', 'User', 'new@user.com', '0831247362', 'testPass123!')
        admin = create_admin_user()
        token = authenticate_user(admin)
        with self.client:
            res = self.client.get(
                f'/users/{user.uuid}',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual('New', data['first_name'])
            self.assertEqual('User', data['last_name'])
            self.assertEqual('new@user.com', data['email'])

    def test_guest_can_not_view_details_for_a_user(self):
        user = create_new_user('New', 'User', 'new@user.com', '0831247362', 'testPass123!')
        with self.client:
            res = self.client.get(
                f'/users/{user.uuid}',
                content_type='application/json',
            )

            self.assert401(res)

    def test_admin_can_activate_a_user(self):
        user = create_new_user('New', 'User', 'new@user.com', '0831247362', 'testPass123!')
        admin = create_admin_user()
        token = authenticate_user(admin)
        with self.client:
            res = self.client.post(
                f'/users/{user.uuid}/activate',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assertEqual(202, res.status_code)

    def test_non_admin_can_not_activate_a_user(self):
        non_active_user = create_new_user('New', 'User', 'new@user.com', '0831247362', 'testPass123!', active=False)
        user = create_new_user()
        token = authenticate_user(user)
        with self.client:
            res = self.client.post(
                f'/users/{non_active_user.uuid}/activate',
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assert403(res)
