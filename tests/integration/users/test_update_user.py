import json
from tests.base import BaseTestCase
from tests.utils import create_new_user, authenticate_user, create_admin_user


class TestUpdateUser(BaseTestCase):
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

    def test_admin_can_update_user(self):
        user = create_new_user('New', 'User', 'new@user.com', '0831247362', 'testPass123!')
        admin = create_admin_user()
        token = authenticate_user(admin)
        with self.client:
            res = self.client.put(
                f'/users/{user.uuid}',
                data=json.dumps({
                    'first_name': 'Updated',
                    'last_name': 'User',
                    'email': 'updated@email.com',
                    'phone': user.phone,
                    'active': user.active,
                    'rank': user.rank,
                    'first_aid': 'EFR',
                    'app_role': user.app_role
                }),
                content_type='application/json',
                headers={'Authorization': f'Bearer {token}'}
            )

            self.assertEqual(202, res.status_code)
