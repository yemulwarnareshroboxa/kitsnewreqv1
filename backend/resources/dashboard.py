from flask_restx import Namespace, fields, Resource
from schemas.sponsor import SponsorSchema
from models.sponsor import SponsorModel
from flask import request
from sqlalchemy import exc
from models.users import UserModel
from models.sponsor import SponsorModel
from models.site_data import SiteDataModel
from models.lab_test import LabtestModel
from models.meterial import MeterialModel
from models.cro_protocol import CroProtocolModel
from models.clab_kit_preparation import ClabKitPreparationModel
from models.visit_kit import VisitKitDetailsModel
from models.screening_kit import ScreeningKitDetailsModel
from flask_jwt_extended import jwt_required, current_user, get_jwt


dashboard_ns = Namespace("dashboard", description="dashboard related operations")


class Dashboard(Resource):
    @dashboard_ns.doc("dashboard for user")
    @jwt_required(fresh=True)
    def get(self):
        response = {
            "no_of_protocols": 0,
            "no_of_sites": 0,
            "no_of_sponsors": 0,
            "no_of_lab_tests": 0,
            "no_of_materials": 0,
            "no_of_received_collections": 0,
            "no_of_pending_collections": 0,
            "no_of_kits": 0,
            "no_of_patients": 0,
            "no_of_sites": 0,
            "no_of_prepared_kits": 0,
            "no_of_verified_kits": 0,
            "no_of_progress_kits": 0,
            "no_of_pending_collections": 0,
            "no_of_received_collections": 0,
        }
        try:
            sponsors = SponsorModel.find_all()
            if sponsors:
                response["no_of_sponsors"] = len(sponsors)

            site_data = SiteDataModel.find_all()
            if site_data:
                response["no_of_sites"] = len(site_data)

            lab_tests = LabtestModel.find_all()
            if lab_tests:
                response["no_of_lab_tests"] = len(lab_tests)

            meteral_data = MeterialModel.find_all()
            if meteral_data:
                response["no_of_materials"] = len(meteral_data)

            cro_protocol = CroProtocolModel.find_all()
            if cro_protocol:
                response["no_of_protocols"] = len(cro_protocol)

            return response, 200
        except (Exception, exc.SQLAlchemyError) as e:
            print(e)
            return {"error": "failed to get the data"}, 500
