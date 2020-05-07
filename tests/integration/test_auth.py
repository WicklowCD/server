import json
from tests.base import BaseTestCase


class TestAuthentication(BaseTestCase):
    def test_new_user_can_register(self):
        with self.client:
            res = self.client.post(
                '/auth/register',
                data=json.dumps(
                    {
                        'first_name': 'Test',
                        'last_name': 'User',
                        'email': 'test:user.com',
                        'phone': '+353831224458',
                        'password': 'test1234',
                    }
                ),
                content_type='application/json'
            )
            data = json.loads(res.data.decode())

            self.assertEqual(201, res.status_code)
            self.assertIn(
                'User successfully registered, you will receive an email once your registration is confirmed by an administrator',
                data['message'])
