from db import db
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
 
 
class Trainings(db.Model):
    __tablename__ = "trainings"
    training_id = db.Column(db.Integer, primary_key=True)
    training_name = db.Column(db.String(100))
 
    def __repr__(self):
        return f"Trainings(training_id={self.training_id}, training_name={self.training_name})"
 
    @classmethod
    def find_all(cls):
        sort_order = getattr(Trainings, "training_id").desc()
        return cls.query.order_by(sort_order).all()
 
    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(training_id=id).first()
 
    @classmethod
    def get_by_code(cls, training_name):
        return cls.query.filter_by(training_name=training_name).first()
   
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
 
 
 
 
class Question(db.Model):
    __tablename__ = 'questions'
    question_id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(255), nullable=False)
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(255), nullable=False)
    training_id = db.Column(db.Integer, db.ForeignKey('trainings.training_id'), nullable=False)
    training = db.relationship('Trainings', backref='questions', lazy=True)
 
    @classmethod
    def find_all(cls):
        sort_order = getattr(Question, "question_id").desc()
        return cls.query.order_by(sort_order).all()
 
    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(question_id=id).first()
 
    @classmethod
    def get_by_code(cls, question_text):
        return cls.query.filter_by(question_id=question_text).first()
   
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
 
 
 