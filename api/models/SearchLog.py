import uuid
from datetime import datetime

from api import db


class SearchLog(db.Model):
    __tablename__ = "search_searchlog"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(255), unique=True, nullable=False)
    search_id = db.Column(db.Integer, db.ForeignKey("searches.id"))
    area = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.String(20), nullable=False)
    end_time = db.Column(db.String(20), nullable=True)
    team = db.Column(db.String(25), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, search, team, area, start_time, end_time=None, notes=None):
        self.uuid = str(uuid.uuid4())
        self.search = search
        self.team = team
        self.area = area
        self.start_time = start_time
        self.end_time = end_time
        self.notes = notes

    def update(self, data):
        self.team = data["team"]
        self.area = data["area"]
        self.start_time = data["start_time"]
        self.end_time = data["end_time"]
        self.notes = data["notes"]
        db.session.commit()
        return True


def new_search_log(search, team, area, start_time, end_time=None, notes=None):
    log = SearchLog(search, team, area, start_time, end_time, notes)
    db.session.add(log)
    db.session.commit()

    return log


def get_search_log_by_uuid(uuid, search_id):
    return SearchLog.query.filter_by(uuid=uuid).filter_by(search_id=search_id).first()
