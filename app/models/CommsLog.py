import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

from app import db


class CommsLog(db.Model):
    __tablename__ = 'search_commslog'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    search_id = db.Column(db.Integer, db.ForeignKey('searches.id'))
    time = db.Column(db.String(20))
    call_sign = db.Column(db.String(10))
    message = db.Column(db.Text)
    action = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, search, time, call_sign, message, action):
        self.search = search
        self.time = time
        self.call_sign = call_sign
        self.message = message
        self.action = action


def add_comms_log(search, time, call_sign, message, action):
    log = CommsLog(search, time, call_sign, message, action)
    db.session.add(log)
    db.session.commit()

    return log
