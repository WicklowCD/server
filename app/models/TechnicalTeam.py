import uuid
from sqlalchemy.dialects.postgresql import UUID

from app import db


class TechnicalTeam(db.Model):
    __tablename__ = 'search_technical_teams'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    name = db.Column(db.String(100))
    search_id = db.Column(db.Integer, db.ForeignKey('searches.id'))
    equipment_type = db.Column(db.String(255), nullable=False)
    member_1 = db.Column(db.String(255), nullable=False)
    member_2 = db.Column(db.String(255), nullable=True)
    member_3 = db.Column(db.String(255), nullable=True)
    notes = db.Column(db.String(255), nullable=True)

    def __init__(self, search, name, equipment_type, member_1, member_2, member_3, notes):
        self.search = search
        self.name = name
        self.equipment_type = equipment_type
        self.member_1 = member_1
        self.member_2 = member_2
        self.member_3 = member_3
        self.notes = notes


def add_technical_team(search, name, equipment_type, member_1, member_2, member_3, notes):
    team = TechnicalTeam(search, name, equipment_type, member_1, member_2, member_3, notes)
    db.session.add(team)
    db.session.commit()

    return team
