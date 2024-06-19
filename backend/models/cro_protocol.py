from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class CroProtocolModel(db.Model):
    __tablename__ = "cro_protocol"
    # extend_existing=True
    id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    protocol_id = db.Column(db.String, unique=True)
    protocol_name = db.Column(db.String)
    # sponsor_id = db.Column(UUID(as_uuid=True), db.ForeignKey("sponsor.sponsor_id"))
    # cro_id = db.Column(UUID(as_uuid=True), db.ForeignKey("cro.cro_id"))
    sponsor_id = db.Column(db.String)
    sponsor_name = db.Column(db.String)
    cro_id = db.Column(db.String)
    no_of_visits = db.Column(db.Integer)
    no_of_screens = db.Column(db.Integer)
    special_instructions = db.Column(db.String)
    global_sample_size = db.Column(db.Integer)
    avant_sample_size = db.Column(db.Integer)
    kit_variant_count = db.Column(db.Integer)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
    created_by = db.Column(db.String)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))
    changed_by = db.Column(db.String)
    changed_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all(cls):
        sort_order = getattr(CroProtocolModel, "created_on").desc()
        return cls.query.order_by(sort_order).all()

    @classmethod
    def get_by_protocol_id(cls, protocol_id):
        return cls.query.filter_by(protocol_id=protocol_id).first()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def get_by_sponsor_id(cls, sponsor_id):
        return cls.query.filter_by(sponsor_id=sponsor_id).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        return self.id
