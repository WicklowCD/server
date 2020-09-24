import json

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user, create_search


class TestListSearches(BaseTestCase):
    def test_user_can_view_list_of_searches(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search1 = create_search()
        search2 = create_search()

        with self.client:
            res = self.client.get(
                "/searches",
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertIn(search1.location, data[0]["location"])
            self.assertIn(search2.oic, data[1]["oic"])
