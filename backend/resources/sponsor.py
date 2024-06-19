from flask_restx import Namespace, fields, Resource
from schemas.sponsor import SponsorSchema
from models.sponsor import SponsorModel
from flask import request
from sqlalchemy import exc
from models.users import UserModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt,
    current_user,
)


sponsor_ns = Namespace("sponsor", description="Sponsor related operations")
sponsors_ns = Namespace("sponsors", description="Sponsors related operations")

sponsor_schema = SponsorSchema()
sponsors_list_schema = SponsorSchema(many=True)

contact_emails = sponsor_ns.model(
    "contact_emails",
    {
        "email": fields.String(required=True),
        "first_name": fields.String(required=True),
        "last_name": fields.String(required=True),
        "contact": fields.String(required=True),
        "designation": fields.String(),
    },
)

sponsor = sponsor_ns.model(
    "sponsor",
    {
        "sponsor_code": fields.String(required=True),
        "sponsor_name": fields.String(required=True),
        "existing_sponsor_code": fields.String(),
        "legal_sponsor_name": fields.String(required=True),
        "address_1": fields.String(required=True),
        "address_2": fields.String(),
        "city": fields.String(required=True),
        "district": fields.String(),
        "region": fields.String(required=True),
        "zip_code": fields.String(required=True),
        "country": fields.String(required=True),
        "office_telephone": fields.String(required=True),
        "mobile_telephone": fields.String(required=True),
        "extension": fields.String(required=True),
        "email": fields.String(required=True),
        "website": fields.String(required=True),
        "user_id": fields.String(),
        "notifier_details": fields.List(fields.Nested(contact_emails)),
    },
)

update_sponsor = sponsor_ns.model(
    "update_sponsor",
    {
        "sponsor_id": fields.String(required=True),
        "existing_sponsor_code": fields.String(),
        "sponsor_code": fields.String(required=True),
        "sponsor_name": fields.String(required=True),
        "legal_sponsor_name": fields.String(required=True),
        "address_1": fields.String(required=True),
        "address_2": fields.String(),
        "designation": fields.String(),
        "city": fields.String(required=True),
        "district": fields.String(required=True),
        "region": fields.String(required=True),
        "zip_code": fields.String(required=True),
        "country": fields.String(required=True),
        "office_telephone": fields.String(required=True),
        "extension": fields.String(required=True),
        "email": fields.List(fields.String(required=True)),
        "website": fields.String(required=True),
        "user_id": fields.String(),
        "notifier_details": fields.List(fields.Nested(contact_emails)),
    },
)


class SponsersList(Resource):
    @sponsors_ns.doc("Get all the sponsers")
    @jwt_required(fresh=True)
    def get(self):
        return (sponsors_list_schema.dump(SponsorModel.find_all()), 200)


class SponserActionsById(Resource):
    @sponsor_ns.doc("get by id")
    @jwt_required(fresh=True)
    def get(self, sponsor_id):
        try:
            data = SponsorModel.get_by_id(sponsor_id)
            if not data:
                return {"message": "sponsor data not found"}, 400
            return (sponsor_schema.dump(data), 200)
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data {}".format(str(e))}, 500


class Sponser(Resource):
    @sponsor_ns.expect(sponsor)
    @sponsor_ns.doc("Create a sponser")
    @jwt_required(fresh=True)
    def post(self):
        sponsor_json = request.get_json()
        sponsor_data = SponsorModel.get_by_code(sponsor_json['sponsor_code'])
        if sponsor_data:
            return {"message": "sponsor data already exisits"}, 500
        try:
            sponser_data = sponsor_schema.load(sponsor_json)
            sponser_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to save data {}".format(str(e))}, 500
        return {"data": [], "message": "created sponser data successfully"}, 201

    @sponsor_ns.expect(update_sponsor)
    @sponsor_ns.doc("Update a sponser")
    @jwt_required(fresh=True)
    def put(self):
        sponsor_json = request.get_json()
        try:
            # import pdb; pdb.set_trace()
            sponsor_data = SponsorModel.get_by_id(sponsor_json["sponsor_id"])
            if not sponsor_data:
                return {"message": "sponsor data not found"}, 500
            for key, value in sponsor_json.items():
                if hasattr(sponsor_data, key) and value is not None:
                    setattr(sponsor_data, key, value)
            sponsor_data.save_to_db()
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to update data {}".format(str(e))}, 500
        return {"data": [], "message": "updated sponser data successfully"}, 201
