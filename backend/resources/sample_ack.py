from flask_restx import Namespace, fields, Resource
from schemas.clab_kit_preparation import ClabKitPreparationSchema
from flask import request
from sqlalchemy import exc
from models.clab_kit_preparation import ClabKitPreparationModel
from models.cro_protocol import CroProtocolModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)
from models.users import UserModel


sample_ack_ns = Namespace("sample_ack", description="sample ack related operations")


clab_kit_preparation_schema = ClabKitPreparationSchema()
clab_kit_list_preparation_schema = ClabKitPreparationSchema(many=True)

ack_screening_kit_details = sample_ack_ns.model(
    "ack_screening_kit_details",
    {
        "ckitid": fields.String(required=True),
        "kitid": fields.String(required=True),
        "preparation": fields.String(required=True),
        "verificaton_status": fields.String(default="Not Verified"),
        "patient_id": fields.String(),
        "site_id": fields.String(),
        "collection": fields.String(default="pending"),
    },
)

ack_visit_kit_details = sample_ack_ns.model(
    "ack_visit_meterial_details",
    {
        "ckitid": fields.String(required=True),
        "kitid": fields.String(required=True),
        "preparation": fields.String(required=True),
        "verification_status": fields.String(default="Not Verified"),
        "patient_id": fields.String(),
        "site_id": fields.String(),
        "collection": fields.String(default="pending"),
    },
)

ack_clab_kit_preparation = sample_ack_ns.model(
    "ack_clab_kit_preparation",
    {
        "protocol_id": fields.String(required=True),
        "protocol_name": fields.String(required=True),
        "screening_kit_details": fields.List(fields.Nested(ack_screening_kit_details)),
        "visit_kit_details": fields.List(fields.Nested(ack_visit_kit_details)),
    },
)


class AckclabKitProtocolActionsById(Resource):
    @sample_ack_ns.doc("get by id")
    @jwt_required(fresh=True)
    def get(self, cro_protocol_id):
        cro_kit_data = ClabKitPreparationModel.get_by_id(cro_protocol_id)
        if not cro_kit_data:
            return {"message": "cro data not found"}, 400
        cro_data = CroProtocolModel.get_by_id(cro_kit_data.protocol_id)
        response = {
            "data": clab_kit_preparation_schema.dump(cro_kit_data),
            "screen_count": cro_data.no_of_screens,
            "visit_count": cro_data.no_of_visits,
            "cro_name": cro_data.protocol_id,
        }
        return response, 200


class AckclabKitPreparation(Resource):
    @sample_ack_ns.expect(ack_clab_kit_preparation)
    @sample_ack_ns.doc("Update a sample ack")
    @jwt_required(fresh=True)
    def put(self):
        request_json = request.get_json()
        kit_data = ClabKitPreparationModel.get_by_id(request_json["protocol_id"])
        if not kit_data:
            return {"message": "kit data not found"}, 500
        for key, value in request_json.items():
            if hasattr(kit_data, key) and value is not None:
                setattr(kit_data, key, value)
        try:
            kit_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update kit details"}, 500
        return {"message": "kit details updated successfully"}, 201
