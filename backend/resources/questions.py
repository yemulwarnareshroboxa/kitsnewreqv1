from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Namespace, fields, Resource
from schemas.questions import QuestionSchema,TrainingSchema
from flask import request
from sqlalchemy import exc
from models.questions import Question,Trainings
from models.users import UserModel
from flask_jwt_extended import jwt_required, current_user, get_jwt
from flask import jsonify
 
training_ns = Namespace("training", description="cell biology Training related operations")
question_ns = Namespace("questions", description="question related operations")
 
training_schema = TrainingSchema()
question_schema = QuestionSchema(many=True)
 
 
 
import random
 
 
class TrainingList(Resource):
    @training_ns.doc("get by all Trainings")
    # @question_ns.marshal_with(training_schema, as_list=True)
    def get(self):
        try:
            trainings = Trainings.query.all()
                # Convert SQLAlchemy objects to dictionaries
            trainings_list = [{'training_id': t.training_id, 'training_name': t.training_name} for t in trainings]
            return jsonify(trainings_list)
        except Exception as e:
            return {'message': str(e)}, 500
       
 
 
 
class QuestionList(Resource):
    @question_ns.doc("get all questions by training id")
    def get(self, training_id):
        try:
            # Assuming Question and QuestionSchema are defined appropriately
            questions = Question.query.filter_by(training_id=training_id).all()
           
            # Shuffle the list of questions
            random.shuffle(questions)
           
            # Get the first 5 shuffled questions
            selected_questions = questions[:5]
           
            # Use QuestionSchema to serialize the data
            question_schema = QuestionSchema(many=True, exclude=['question_id'])
            selected_questions_json = question_schema.dump(selected_questions)
           
            # Customizing key names and formatting options
            renamed_questions = []
            for idx, q in enumerate(selected_questions_json):
                # Format options with letters (a), b), c), d))
                options_with_letters = [
                    f"{chr(ord('a') + i)}) {option}"
                    for i, option in enumerate(q['options'])
                ]
               
                # Determine the answer_id index (0-based)
                answer_id_index = q['options'].index(q['answer'])
               
                renamed_questions.append({
                    'title': q['question_text'],
                    'options': options_with_letters,
                    'answerId': answer_id_index   # Convert to 1-based index
                })
           
            return jsonify(renamed_questions)
       
        except Exception as e:
            return {"message": str(e)}, 500
 