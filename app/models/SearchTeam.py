import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

from app import db


class SearchTeam(db.Model):
    __tablename__ = 'search_teams'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    search_id = db.Column(db.Integer, db.ForeignKey('searches.id'))
    team_leader = db.Column(db.String(255), nullable=False)
    medic = db.Column(db.String(255), nullable=False)
    responder_1 = db.Column(db.String(255), nullable=True)
    responder_2 = db.Column(db.String(255), nullable=True)
    responder_3 = db.Column(db.String(255), nullable=True)

    def __init__(self, search, team_leader, medic, responder_1, responder_2, responder_3):
        self.search = search
        self.team_leader = team_leader
        self.medic = medic
        self.responder_1 = responder_1
        self.responder_2 = responder_2
        self.responder_3 = responder_3


def add_team(search, team_leader, medic, responder_1, responder_2, responder_3):
    team = SearchTeam(search, team_leader, medic, responder_1, responder_2, responder_3)
    db.session.add(team)
    db.session.commit()

    return team
