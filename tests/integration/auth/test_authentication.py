import json
from tests.base import BaseTestCase
from tests.utils import create_new_user


class TestUserAuthentication(BaseTestCase):
    def test_user_can_authenticate(self):
        create_new_user('Test', 'User', 'test@user.com', '0831221362', 'testPass123')
        with self.client:
            res = self.client.post(
                '/auth/login',
                data=json.dumps({
                    'email': 'test@user.com',
                    'password': 'testPass123',
                }),
                content_type='application/json'
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertIn('test@user.com', data['email'])
            self.assertIn('token', data)

    def test_user_can_not_authenticate_with_incorrect_password(self):
        create_new_user('Test', 'User', 'test@user.com', '0831221362', 'testPass123')
        with self.client:
            res = self.client.post(
                '/auth/login',
                data=json.dumps({
                    'email': 'test@user.com',
                    'password': 'completelyIncorrectPassword'
                }),
                content_type='application/json'
            )
            data = json.loads(res.data.decode())

            self.assert400(res)
            self.assertIn('Email address or password incorrect', data['message'])
            self.assertNotIn('token', data)

    def test_non_registered_user_can_not_authenticate(self):
        with self.client:
            res = self.client.post(
                '/auth/login',
                data=json.dumps({
                    'email': 'test@user.com',
                    'password': 'testPass123',
                }),
                content_type='application/json'
            )
            data = json.loads(res.data.decode())

            self.assert400(res)
            self.assertIn('Email address or password incorrect', data['message'])
            self.assertNotIn('token', data)
