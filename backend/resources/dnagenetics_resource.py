from flask import request
from flask_restx import Namespace, Resource, fields, marshal
from sqlalchemy import exc
from models.dna_genetics_model import DnaGeneticsModel
from schemas.dnagenetics_schema import DnaGeneticsSchema

dna_genetics_data_ns = Namespace("dna_genetics_data", description="DNA Genetics data related operations")

dna_genetics_schema = DnaGeneticsSchema()
dna_genetics_list_schema = DnaGeneticsSchema(many=True)

create_dna_genetics_data = dna_genetics_data_ns.model(
    "CreateDnaGeneticsData",
    {
        "main_title": fields.String(required=True),
        "content_detail": fields.String(),
        "created_by": fields.String(),
        "changed_by": fields.String(),
    },
)

update_dna_genetics_data = dna_genetics_data_ns.model(
    "UpdateDnaGeneticsData",
    {
        "dnagenetics_id": fields.String(required=True),
        "main_title": fields.String(required=True),
        "content_detail": fields.String(),
        "created_by": fields.String(),
        "changed_by": fields.String(),
    },
)

class DnaGeneticsDatasList(Resource):
    @dna_genetics_data_ns.doc("Get all DNA genetics data with pagination")
    def get(self):
        try:
            data = DnaGeneticsModel.find_all()
            return dna_genetics_list_schema.dump(data), 200
        except (Exception, exc.SQLAlchemyError) as e:
            return {"error": f"Failed to get data: {str(e)}"}, 500

class DnaGeneticsActionsById(Resource):
    @dna_genetics_data_ns.doc("Update DNA Genetics data")
    @dna_genetics_data_ns.expect(update_dna_genetics_data)
    def put(self, dnagenetics_id):
        try:
            request_json = request.get_json()
            request_json['dnagenetics_id'] = dnagenetics_id  
            
            dna_genetics_data = DnaGeneticsModel.get_by_id(dnagenetics_id)
            if not dna_genetics_data:
                return {"message": "DNA Genetics data not found"}, 404
            
            for key, value in request_json.items():
                if key != "dnagenetics_id" and hasattr(dna_genetics_data, key):
                    setattr(dna_genetics_data, key, value)
            
            dna_genetics_data.save_to_db()
            return {"data": dna_genetics_schema.dump(dna_genetics_data), "message": "Updated DNA genetics data successfully"}, 200
        
        except exc.SQLAlchemyError as e:
            return {"error": f"Failed to update data: {str(e)}"}, 500
        
    def get(self, dnagenetics_id):
        try:
            data = DnaGeneticsModel.get_by_id(dnagenetics_id)
            if not data:
                return {"message": "Cell biology data not found"}, 404
            return dna_genetics_schema.dump(data), 200
        except (Exception, exc.SQLAlchemyError) as e:
            return {"error": f"Failed to get the data: {str(e)}"}, 500

class DnaGeneticsData(Resource):
    @dna_genetics_data_ns.doc("Create DNA Genetics data")
    @dna_genetics_data_ns.expect(create_dna_genetics_data)
    def post(self):
        try:
            dna_genetics_data_json = request.get_json()
            if not dna_genetics_data_json:
                return {"error": "No JSON data received"}, 400
            if 'main_title' not in dna_genetics_data_json:
                return {"error": "main_title is required"}, 400
            
            existing_data = DnaGeneticsModel.get_by_main_title(dna_genetics_data_json['main_title'])
            if existing_data:
                return {"error": "DNA Genetics data with this main title already exists"}, 409
            
            dna_genetics_data = dna_genetics_schema.load(dna_genetics_data_json)
            dna_genetics_data.save_to_db()
            
            return {"data": dna_genetics_schema.dump(dna_genetics_data), "message": "Success"}, 201
        
        except exc.SQLAlchemyError as e:
            return {"error": f"Failed to save data: {str(e)}"}, 500