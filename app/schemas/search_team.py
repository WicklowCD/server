from app import ma
from app.models.SearchTeam import SearchTeam


class SearchTeamSchema(ma.SQLAlchemySchema):
    class Meta:
        model = SearchTeam

    uuid = ma.auto_field()
    search_id = ma.auto_field()
    team_leader = ma.auto_field()
    medic = ma.auto_field()
    responder_1 = ma.auto_field()
    responder_2 = ma.auto_field()
    responder_3 = ma.auto_field()


search_team_schema = SearchTeamSchema()
search_teams_schema = SearchTeamSchema(many=True)
