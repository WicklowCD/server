from app import ma
from app.models.SearchLog import SearchLog


class SearchLogSchema(ma.SQLAlchemySchema):
    class Meta:
        model = SearchLog

    uuid = ma.auto_field()
    search_id = ma.auto_field()
    team = ma.auto_field()
    area = ma.auto_field()
    start_time = ma.auto_field()
    end_time = ma.auto_field()
    notes = ma.auto_field()


search_log_schema = SearchLogSchema()
search_logs_schema = SearchLogSchema(many=True)
