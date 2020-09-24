import json
from datetime import datetime

from tests.base import BaseTestCase
from tests.utils import create_admin_user, authenticate_user


class TestCreateSearch(BaseTestCase):
    def test_admin_can_create_new_saerch(self):
        admin = create_admin_user()
        token = authenticate_user(admin)
        with self.client:
            res = self.client.post(
                "/searches",
                data=json.dumps(
                    {
                        "location": "Test Location",
                        "date": str(datetime.today()),
                        "start_time": datetime.utcnow().strftime("%H:%M"),
                        "type": "Incident",
                        "oic": "Commanding Officer",
                        "sm": "Search Manager",
                        "so": "Safety Officer",
                        "sl": "Section Leader",
                        "ro": "Radio Operator",
                        "scribe": "Scribe",
                    }
                ),
                content_type="application/json",
                headers={"Authorization": f"Bearer {token}"},
            )

            data = json.loads(res.data.decode())

            self.assertEqual(201, res.status_code)
            self.assertIn("id", data)
