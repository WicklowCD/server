import json

from tests.base import BaseTestCase
from tests.utils import (
    create_admin_user,
    authenticate_user,
    create_search,
    create_radio_assignment,
)


class TestRadioAssignment(BaseTestCase):
    def test_user_can_assign_a_radio_to_a_user(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()

        with self.client:
            res = self.client.post(
                f"/api/searches/{search.uuid}/radios",
                data=json.dumps(
                    {"call_sign": "WW01", "tetra_number": "53831", "name": "Test User"}
                ),
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )

            self.assertEqual(201, res.status_code)

    def test_user_can_view_list_of_radio_assignments(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        radio1 = create_radio_assignment(search)
        radio2 = create_radio_assignment(search)
        radio3 = create_radio_assignment(search)

        with self.client:
            res = self.client.get(
                f"/api/searches/{search.uuid}/radios",
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )

            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual(radio1.name, data[0]["name"])
            self.assertEqual(radio2.tetra_number, data[1]["tetra_number"])
            self.assertEqual(radio3.call_sign, data[2]["call_sign"])
