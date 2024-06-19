from db import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY


class ScreeningKitDetailsModel(db.Model):
    __tablename__ = "screening_kit_details"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro_protocol.id"))
    screening_kit_count = db.Column(db.Integer)
    # visit_no = db.Column(db.Integer)
    lab_test_ids = db.Column(ARRAY(db.String))
    meterial_details = db.Column(JSONB)
    kit_varient = db.Column(db.String)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_protocol_id(cls, protocol_id):
        return cls.query.filter_by(protocol_id=protocol_id).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
