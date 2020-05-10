import json
from tests.base import BaseTestCase
from tests.utils import create_new_user


class TestRegistration(BaseTestCase):
    def test_new_user_can_register(self):
        with self.client:
            res = self.client.post(
                '/auth/register',
                data=json.dumps(
                    {
                        'first_name': 'Test',
                        'last_name': 'User',
                        'email': 'test@user.com',
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

    def test_user_can_not_register_with_email_that_already_exists(self):
        create_new_user('Test', 'User', 'test@user.com', '0831221362', 'testPass123')
        with self.client:
            res = self.client.post(
                '/auth/register',
                data=json.dumps(
                    {
                        'first_name': 'Test',
                        'last_name': 'User',
                        'email': 'test@user.com',
                        'phone': '+353831224458',
                        'password': 'test1234',
                    }
                ),
                content_type='application/json'
            )
            data = json.loads(res.data.decode())

            self.assertEqual(400, res.status_code)
            self.assertIn('Email address already in use', data['message'])

    def test_fields_are_required_to_register_a_new_user(self):
        with self.client:
            res = self.client.post(
                '/auth/register',
                data=json.dumps({}),
                content_type='application/json'
            )
            data = json.loads(res.data.decode())

            self.assertEqual(400, res.status_code)
            self.assertIn('Input payload validation failed', data['message'])
            self.assertIn("'email' is a required property", data['errors']['email'])
            self.assertIn("'password' is a required property", data['errors']['password'])
            self.assertIn("'phone' is a required property", data['errors']['phone'])
            self.assertIn("'first_name' is a required property", data['errors']['first_name'])
            self.assertIn("'last_name' is a required property", data['errors']['last_name'])
