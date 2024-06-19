from db import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

class ClabKitPreparationModel(db.Model):
    __tablename__ = "clab_kit_preparation"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro_protocol.id"))
    screening_kit_details = db.Column(JSONB)
    protocol_name = db.Column(db.String)
    visit_kit_details = db.Column(JSONB)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all_with_entities(cls):
        sort_order = getattr(ClabKitPreparationModel, "created_on").desc()
        return cls.query.with_entities(ClabKitPreparationModel.id, ClabKitPreparationModel.protocol_id, ClabKitPreparationModel.protocol_name).order_by(sort_order).all()


    @classmethod
    def find_all(cls):
        sort_order = getattr(ClabKitPreparationModel, "created_on").desc()
        return cls.query.order_by(sort_order).all()
    
    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(protocol_id=id).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(protocol_id=id).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
