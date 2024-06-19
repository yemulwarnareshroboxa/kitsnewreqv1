from db import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID, JSONB


class SiteDataModel(db.Model):
    __tablename__ = "sitedata"
    # extend_existing=True
    site_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    site_data_code = db.Column(db.String)
    site_data_name = db.Column(db.String)
    legal_site_data_name = db.Column(db.String)
    address_1 = db.Column(db.String)
    address_2 = db.Column(db.String)
    city = db.Column(db.String)
    district = db.Column(db.String)
    region = db.Column(db.String)
    zip_code = db.Column(db.String)
    country = db.Column(db.String)
    office_telephone = db.Column(db.String)
    extension = db.Column(db.String)
    mobile_telephone = db.Column(db.String)
    email = db.Column(db.String)
    website = db.Column(db.String)
    notifier_emails = db.Column(JSONB)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
    created_by = db.Column(db.String)
    created_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))
    changed_by = db.Column(db.String)
    changed_on = db.Column(db.DateTime(timezone=False), default=datetime.now(tz=None))

    @classmethod
    def find_all(cls):
        sort_order = getattr(SiteDataModel, "created_on").desc()
        return cls.query.order_by(sort_order).all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(site_id=id).first()
    
    @classmethod
    def get_by_site_code(cls, code):
        return cls.query.filter_by(site_data_code=code).first()

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(site_id=id).first()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
