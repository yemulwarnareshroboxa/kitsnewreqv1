from ma import ma
from models.questions import Question,Trainings
from marshmallow import fields
 
 
   
 
class TrainingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Trainings
        load_instance = True
        include_fk = True
 
class QuestionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Question
        load_instance = True
        include_fk = True
 