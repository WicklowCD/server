import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

from app import db


class RadioAssignment(db.Model):
    __tablename__ = 'search_radioassignments'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    search_id = db.Column(db.Integer, db.ForeignKey('searches.id'))
    call_sign = db.Column(db.String(10))
    tetra_number = db.Column(db.String(10))
    name = db.Column(db.String(255))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
