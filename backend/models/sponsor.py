from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB


class SponsorModel(db.Model):
    __tablename__ = "sponsor"
    # extend_existing=True
    sponsor_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    sponsor_code = db.Column(db.String)
    existing_sponsor_code = db.Column(db.String)
    sponsor_name = db.Column(db.String)
    legal_sponsor_name = db.Column(db.String)
    address_1 = db.Column(db.String)
    address_2 = db.Column(db.String)
    city = db.Column(db.String)
    district = db.Column(db.String)
    region = db.Column(db.String)
    zip_code = db.Column(db.String)
    country = db.Column(db.String)
    office_telephone = db.Column(db.String)
    mobile_telephone = db.Column(db.String)
    extension = db.Column(db.String)
    email = db.Column(db.String)
    notifier_details = db.Column(JSONB)
    website = db.Column(db.String)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
    created_by = db.Column(db.String)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))
    changed_by = db.Column(db.String)
    changed_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(sponsor_id=id).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(sponsor_id=id).first()
    
    @classmethod
    def get_by_code(cls, sponsor_code):
        return cls.query.filter_by(sponsor_code=sponsor_code).first()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
