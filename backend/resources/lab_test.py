from flask_restx import Namespace, fields, Resource
from models.lab_test import LabtestModel
from schemas.lab_test import LabtestSchema
from flask import request
from sqlalchemy import exc
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)


lab_test_ns = Namespace("lab_test", description="lab_test related operations")
lab_tests_ns = Namespace("lab_tests", description="lab_tests related operations")

lab_test_schema = LabtestSchema()
lab_tests_schema = LabtestSchema(many=True)

lab_test = lab_tests_ns.model(
    "lab_test",
    {
        "name": fields.String(required=True),
        "created_by": fields.String(),
        "classfication": fields.String(),
    },
)

update_lab_test = lab_tests_ns.model(
    "update_lab_test",
    {
        "lab_test_id": fields.String(required=True),
        "lab_test": fields.String(required=True),
        "material": fields.String(required=True),
        "size": fields.String(required=True),
        "image": fields.String(required=True),
        "created_by": fields.String(),
    },
)

"""
lab_test takes only name and delete api

meterial api  ...name, size, image  create, update , get

"""


class LabtestssList(Resource):
    @lab_tests_ns.doc("Get all the lab_tests")
    @jwt_required(fresh=True)
    def get(self):
        return (lab_tests_schema.dump(LabtestModel.find_all()), 200)


class LabActionsById(Resource):
    @lab_tests_ns.doc("delete lab test by id")
    @jwt_required(fresh=True)
    def delete(self, lab_test_id):
        try:
            lab_test_data = LabtestModel.get_by_id(lab_test_id)
            if lab_test_data:
                lab_test_data.delete_from_db()
            else:
                return {"message": "deletion failed, lab_test not found"}, 400
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {
                "message": "deletion failed, internal server error{}".format(str(e))
            }, 500

        return {"message": "lab test deleted successfully"}, 200


class Labtest(Resource):
    @lab_test_ns.expect(lab_test)
    @lab_test_ns.doc("Create a lab_test")
    @jwt_required(fresh=True)
    def post(self):
        lab_test_json = request.get_json()
        try:
            lab_test_data = lab_test_schema.load(lab_test_json)
            lab_test_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data{}".format(str(e))}, 500
        return {"data": [], "message": "success"}, 201

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
