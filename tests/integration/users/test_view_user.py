import json
from tests.base import BaseTestCase
from tests.utils import create_new_user, authenticate_user, create_admin_user


class TestViewUser(BaseTestCase):
    def test_user_can_view_details_for_a_specific_user(self):
        user = create_new_user(
            "New", "User", "new@user.com", "0831247362", "testPass123!"
        )
        admin = create_admin_user()
        token = authenticate_user(admin)
        with self.client:
            res = self.client.get(
                f"/api/users/{user.uuid}",
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual("New", data["first_name"])
            self.assertEqual("User", data["last_name"])
            self.assertEqual("new@user.com", data["email"])

    def test_guest_can_not_view_details_for_a_user(self):
        user = create_new_user(
            "New", "User", "new@user.com", "0831247362", "testPass123!"
        )
        with self.client:
            res = self.client.get(
                f"/api/users/{user.uuid}",
                content_type="application/json",
            )

            self.assert401(res)
