from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from sqlalchemy import exc
from models.cell_biology_model import cellBiologyModel  # Ensure this import matches your actual model name
from schemas.cell_biology_schema import CellBiologySchema

cell_biology_data_ns = Namespace("cell_biology_data", description="Cell Biology data related operations")

cell_biology_schema = CellBiologySchema()
cell_biologies_list_schema = CellBiologySchema(many=True)

create_cell_biology_data = cell_biology_data_ns.model(
    "create_cell_biology_data",
    {
        "main_title": fields.String(required=True),
        "content_detail": fields.String(),
        "created_by": fields.String(),
        "changed_by": fields.String(),
    },
)

update_cell_biology_data = cell_biology_data_ns.model(
    "update_cell_biology_data",
    {
        "cellbiology_id": fields.String(required=True),
        "main_title": fields.String(required=True),
        "content_detail": fields.String(),
        "created_by": fields.String(),
        "changed_by": fields.String(),
    },
)

class CellBiologydatasList(Resource):
    @cell_biology_data_ns.doc("Get all cell biology data")
    def get(self):
        try:
            data = cellBiologyModel.find_all()
            return cell_biologies_list_schema.dump(data), 200
        except (Exception, exc.SQLAlchemyError) as e:
            return {"error": f"Failed to get data: {str(e)}"}, 500

class CellBiologyActionsById(Resource):
    @cell_biology_data_ns.doc("Update cell biology data")
    @cell_biology_data_ns.expect(update_cell_biology_data)
    def put(self, cellbiology_id):
        try:
            request_json = request.get_json()
            request_json['cellbiology_id'] = cellbiology_id  # Ensure ID consistency
            
            cell_biology_data = cellBiologyModel.get_by_id(cellbiology_id)
            if not cell_biology_data:
                return {"message": "Cell biology data not found"}, 404
            for key, value in request_json.items():
                if key != "cellbiology_id" and hasattr(cell_biology_data, key):
                    setattr(cell_biology_data, key, value)
            cell_biology_data.save_to_db()
            return {"data": cell_biology_schema.dump(cell_biology_data), "message": "Updated cell biology data successfully"}, 200
        except exc.SQLAlchemyError as e:
            return {"error": f"Failed to update data: {str(e)}"}, 500
        
    def get(self, cellbiology_id):
        try:
            data = cellBiologyModel.get_by_id(cellbiology_id)
            if not data:
                return {"message": "Cell biology data not found"}, 404
            return cell_biology_schema.dump(data), 200
        except (Exception, exc.SQLAlchemyError) as e:
            return {"error": f"Failed to get the data: {str(e)}"}, 500
        
class CellBiologydata(Resource):
    @cell_biology_data_ns.expect(create_cell_biology_data)
    @cell_biology_data_ns.doc("Create cell biology data")
    def post(self):
        try:
            cell_biology_data_json = request.get_json()
            if not cell_biology_data_json:
                return {"error": "No JSON data received"}, 400
            
            if 'main_title' not in cell_biology_data_json:
                return {"error": "main_title is required"}, 400
            
            existing_data = cellBiologyModel.get_by_main_title(cell_biology_data_json['main_title'])
            if existing_data:
                return {"error": "Cell biology data with this main title already exists"}, 409
            
            cell_biology_data = cell_biology_schema.load(cell_biology_data_json)
            cell_biology_data.save_to_db()
            
            return {"data": cell_biology_schema.dump(cell_biology_data), "message": "Success"}, 201
        
        except exc.SQLAlchemyError as e:
            return {"error": f"Failed to save data: {str(e)}"}, 500