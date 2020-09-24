import json

from tests.base import BaseTestCase
from tests.utils import (
    create_admin_user,
    authenticate_user,
    create_search,
    create_search_log,
)


class TestSearchLogs(BaseTestCase):
    def test_user_can_create_a_search_log(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()

        with self.client:
            res = self.client.post(
                f"/searches/{search.uuid}/logs/search",
                data=json.dumps(
                    {
                        "team": "Team 1",
                        "area": "Search Area",
                        "start_time": "12:00",
                    }
                ),
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )

            self.assertEqual(201, res.status_code)

    def test_user_can_view_a_list_of_search_logs(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        log1 = create_search_log(search)
        log2 = create_search_log(search)

        with self.client:
            res = self.client.get(
                f"/searches/{search.uuid}/logs/search",
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )
            data = json.loads(res.data.decode())

            self.assert200(res)
            self.assertEqual(log1.team, data[0]["team"])
            self.assertEqual(log2.start_time, data[0]["start_time"])

    def test_user_can_update_a_search_log(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        search = create_search()
        log = create_search_log(search)

        with self.client:
            res = self.client.put(
                f"/searches/{search.uuid}/logs/search/{log.uuid}",
                data=json.dumps(
                    {
                        "team": log.team,
                        "area": log.area,
                        "start_time": log.start_time,
                        "end_time": "15:00",
                        "notes": "Nothing Found",
                    }
                ),
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )

            self.assertEqual(202, res.status_code)
