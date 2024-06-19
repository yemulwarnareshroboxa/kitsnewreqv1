from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, ARRAY


class MeterialModel(db.Model):
    __tablename__ = "meterial"
    # extend_existing=True
    meterial_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    name = db.Column(db.String)
    size = db.Column(ARRAY(db.String))
    image = db.Column(db.String)
    # user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))'''
    created_by = db.Column(db.String)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))
    changed_by = db.Column(db.String)
    changed_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all(cls):
        sort_order = getattr(MeterialModel, "created_on").desc()
        return cls.query.order_by(sort_order).all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(meterial_id=id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
