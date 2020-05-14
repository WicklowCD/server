import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

from app import db


class SearchLog(db.Model):
    __tablename__ = 'search_searchlog'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True, nullable=False, default=uuid.uuid4)
    search_id = db.Column(db.Integer, db.ForeignKey('searches.id'))
    start_time = db.Column(db.String(20))
    end_time = db.Column(db.String(20))
    team = db.Column(db.String(25))
    notes = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
