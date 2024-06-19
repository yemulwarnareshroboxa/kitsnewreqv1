from flask_restx import Namespace, fields, Resource
from models.meterial import MeterialModel
from schemas.meterial import MeterialSchema
from flask import request
from sqlalchemy import exc
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)


meterial_ns = Namespace("meterial", description="meterial related operations")
meterials_ns = Namespace("meterials", description="meterials related operations")

meterial_schema = MeterialSchema()
meterials_schema = MeterialSchema(many=True)

meterial_test = meterial_ns.model(
    "meterial",
    {
        "name": fields.String(required=True),
        "image": fields.String(required=True),
        "size": fields.List(fields.String(required=True)),
        "created_by": fields.String(),
    },
)

"""
update_lab_test = lab_tests_ns.model(
    "update_lab_test",
    {
        "lab_test_id": fields.String(required=True),
        "lab_test": fields.String(required=True),
        "material": fields.String(required=True),
        "size": fields.String(required=True),
        "image": fields.String(required=True),
    },
)"""

"""
lab_test takes only name and delete api

meterial api  ...name, size, image  create, update , get

"""


class MeterialsList(Resource):
    @meterials_ns.doc("Get all the meterials")
    @jwt_required(fresh=True)
    def get(self):
        return (meterials_schema.dump(MeterialModel.find_all()), 200)


class MeterialActionsById(Resource):
    @meterial_ns.doc("get by id")
    @jwt_required(fresh=True)
    def get(self, meterial_id):
        meterial_data = MeterialModel.get_by_id(meterial_id)
        if not meterial_data:
            return {"message": "meterial data not found"}, 400

        return (meterial_schema.dump(meterial_data), 200)

    @meterial_ns.doc("update meterial data by id")
    @meterial_ns.expect(meterial_test)
    @jwt_required(fresh=True)
    def put(self, meterial_id):
        try:
            request_json = request.get_json()
            meterial_data = MeterialModel.get_by_id(meterial_id)
            if meterial_data:
                for key, value in request_json.items():
                    if hasattr(meterial_data, key) and value is not None:
                        setattr(meterial_data, key, value)
                meterial_data.save_to_db()
            else:
                return {"message": "updation failed,  meterial data not found"}, 400
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {
                "message": "updation failed, internal server error{}".format(str(e))
            }, 500

        return {"message": "meterail data updated successfully"}, 200


class Meterial(Resource):
    @meterial_ns.doc("create new meterial")
    @meterial_ns.expect(meterial_test)
    @jwt_required(fresh=True)
    def post(self):
        try:
            request_json = request.get_json()
            meterial_data = meterial_schema.load(request_json)
            meterial_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {
                "message": "creation failed, internal server error{}".format(str(e))
            }, 500

        return {"message": "meterial data created successfully"}, 201

    """@lab_test_ns.expect(update_lab_test)
    @lab_test_ns.doc("Update a lab test")
    @jwt_required(fresh=True)
    def put(self):
        userId = current_user.user_id
        user_data = UserModel.find_by_id(userId)
        getjt = get_jwt()
        if float(getjt["signin_seconds"]) != user_data.last_logged_in.timestamp():
            return {
                "message": "Not a valid Authorization token, logout and login again",
                "error": "not_authorized",
            }, 401
        request_json = request.get_json()
        try:
            lab_test_data = LabtestModel.get_by_id(request_json["lab_test_id"])
            if not lab_test_data:
                return {"message": "lab_test data not found"}, 500
            for key, value in request_json.items():
                if hasattr(lab_test_data, key) and value is not None:
                    setattr(lab_test_data, key, value)
            lab_test_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update data {}".format(str(e))}, 500
        return {"data": [], "message": "updated lab test data successfully"}, 201"""
