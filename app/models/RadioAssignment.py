import uuid
from datetime import datetime

from app import db


class RadioAssignment(db.Model):
    __tablename__ = "search_radioassignments"

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(255), unique=True, nullable=False)
    search_id = db.Column(db.Integer, db.ForeignKey("searches.id"))
    call_sign = db.Column(db.String(10))
    tetra_number = db.Column(db.String(10))
    name = db.Column(db.String(255))
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, search, call_sign, tetra_number, name):
        self.uuid = str(uuid.uuid4())
        self.search = search
        self.call_sign = call_sign
        self.tetra_number = tetra_number
        self.name = name


def new_radio_assignment(search, call_sign, tetra_number, name):
    assignment = RadioAssignment(search, call_sign, tetra_number, name)
    db.session.add(assignment)
    db.session.commit()
    return assignment
