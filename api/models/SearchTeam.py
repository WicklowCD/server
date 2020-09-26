import uuid
from datetime import datetime

from api import db


class SearchTeam(db.Model):
    __tablename__ = "search_teams"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(100))
    search_id = db.Column(db.Integer, db.ForeignKey("searches.id"))
    team_leader = db.Column(db.String(255), nullable=False)
    medic = db.Column(db.String(255), nullable=False)
    responder_1 = db.Column(db.String(255), nullable=True)
    responder_2 = db.Column(db.String(255), nullable=True)
    responder_3 = db.Column(db.String(255), nullable=True)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(
        self, search, name, team_leader, medic, responder_1, responder_2, responder_3
    ):
        self.uuid = str(uuid.uuid4())
        self.search = search
        self.name = name
        self.team_leader = team_leader
        self.medic = medic
        self.responder_1 = responder_1
        self.responder_2 = responder_2
        self.responder_3 = responder_3

    def update(self, data):
        self.name = data["name"]
        self.team_leader = data["team_leader"]
        self.medic = data["medic"]
        self.responder_1 = data["responder_1"]
        self.responder_2 = data["responder_2"]
        self.responder_3 = data["responder_3"]
        db.session.commit()
        return True


def add_team(search, name, team_leader, medic, responder_1, responder_2, responder_3):
    team = SearchTeam(
        search, name, team_leader, medic, responder_1, responder_2, responder_3
    )
    db.session.add(team)
    db.session.commit()

    return team


def get_team_by_uuid(uuid, search_id):
    return SearchTeam.query.filter_by(uuid=uuid).filter_by(search_id=search_id).first()
