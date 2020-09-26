from api import ma
from api.models.Search import Search
from api.schemas.search_team import search_teams_schema
from api.schemas.search_log import search_logs_schema
from api.schemas.radio_assignment import radio_assignments_schema
from api.schemas.comms_log import comms_logs_schema


class SearchSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Search

    uuid = ma.auto_field()
    location = ma.auto_field()
    date = ma.auto_field()
    start_time = ma.auto_field()
    end_time = ma.auto_field()
    type = ma.auto_field()
    oic = ma.auto_field()
    sm = ma.auto_field()
    so = ma.auto_field()
    sl = ma.auto_field()
    ro = ma.auto_field()
    scribe = ma.auto_field()
    notes = ma.auto_field()
    teams = ma.Nested(search_teams_schema)
    radios = ma.Nested(radio_assignments_schema)
    comms_log = ma.Nested(comms_logs_schema)
    search_log = ma.Nested(search_logs_schema)


search_schema = SearchSchema()
searches_schema = SearchSchema(many=True)
