import uuid
from datetime import datetime

from api import db


class Search(db.Model):
    __tablename__ = "searches"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(255), unique=True, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    date = db.Column(db.String(20))
    start_time = db.Column(db.String(10), nullable=False)
    end_time = db.Column(db.String(10), nullable=True)
    type = db.Column(db.String(255))
    oic = db.Column(db.String(255))
    sm = db.Column(db.String(255))
    so = db.Column(db.String(255))
    sl = db.Column(db.String(255))
    ro = db.Column(db.String(255))
    scribe = db.Column(db.String(255))
    notes = db.Column(db.Text)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    teams = db.relationship("SearchTeam", backref="search", lazy="dynamic")
    radios = db.relationship("RadioAssignment", backref="search", lazy="dynamic")
    comms_log = db.relationship("CommsLog", backref="search", lazy="dynamic")
    search_log = db.relationship("SearchLog", backref="search", lazy="dynamic")

    def __init__(self, location, date, start_time, type, oic, sm, so, sl, ro, scribe):
        self.uuid = str(uuid.uuid4())
        self.location = location
        self.date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime(
            "%Y-%m-%d"
        )
        self.start_time = start_time
        self.type = type
        self.oic = oic
        self.sm = sm
        self.so = so
        self.sl = sl
        self.ro = ro
        self.scribe = scribe

    def end(self, end_time, notes):
        self.end_time = end_time
        self.notes = notes
        db.session.commit()

        return True


def create_new_search(location, date, start_time, type, oic, sm, so, sl, ro, scribe):
    search = Search(location, date, start_time, type, oic, sm, so, sl, ro, scribe)
    db.session.add(search)
    db.session.commit()

    return search


def get_all_searches():
    return Search.query.all()


def get_search_by_uuid(uuid):
    return Search.query.filter_by(uuid=uuid).first()
