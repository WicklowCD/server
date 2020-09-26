from api import ma
from api.models.CommsLog import CommsLog


class CommsLogSchema(ma.SQLAlchemySchema):
    class Meta:
        model = CommsLog

    uuid = ma.auto_field()
    search_id = ma.auto_field()
    time = ma.auto_field()
    call_sign = ma.auto_field()
    message = ma.auto_field()
    action = ma.auto_field()


comms_log_schema = CommsLogSchema()
comms_logs_schema = CommsLogSchema(many=True)
