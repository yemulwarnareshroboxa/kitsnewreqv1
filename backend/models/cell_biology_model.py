from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID

class cellBiologyModel(db.Model):
    __tablename__ = "cellbiology"
    cellbiology_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    main_title = db.Column(db.String, unique=True)
    content_detail = db.Column(db.Text)
    created_by = db.Column(db.String)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))
    changed_by = db.Column(db.String)
    changed_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all(cls):
        sort_order = getattr(cls, "created_on").desc()
        return cls.query.order_by(sort_order).all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(cellbiology_id=id).first()
    
    @classmethod
    def get_by_main_title(cls, main_title):
        return cls.query.filter_by(main_title=main_title).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()