from db import db
from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID
import uuid
import os
import datetime


class RefreshTokenModel(db.Model):
    __tablename__ = "refresh_tokens"
    # extend_existing=True

    # user_id =  db.Column(UUID(as_uuid=True), default =uuid.uuid4,primary_key=True)
    # email = db.Column(db.String(100), nullable=False, unique=True)
    # password = db.Column(db.String(80), nullable=False)

    token_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    token = db.Column(db.String, nullable=False, index=True)
    token_type = db.Column(db.String)
    creation_date_time_dt = db.Column(
        db.DateTime(timezone=False), default=datetime.datetime.now(tz=None)
    )
    last_updated_date_time_dt = db.Column(db.DateTime(timezone=False))
    created_by = db.Column(db.String, default=os.environ["DB_USERNAME"])

    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("users.user_id"))
    # user = db.relationship("UserModel",primaryjoin="UserModel.email == RefreshTokenModel.email")
    """
    def __init__(self, email, candidate_description):
        self.email = email
        self.candidate_description = candidate_description
    """

    def __repr__(self):
        return "RefreshTokenModel(token=%s)" % (self.token)

    def json(self):
        return {"token": self.token}

    @classmethod
    def find_by_token(cls, token):
        return cls.query.filter_by(token=token).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
