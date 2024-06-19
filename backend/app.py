from flask import Flask, Blueprint, jsonify
from flask_restx import Api
from flask_jwt_extended import JWTManager
 
from datetime import timedelta
from ma import ma
from flask_cors import CORS
import os
from db import db
import flask_excel as excel
 
# from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import uuid
 
 
from resources.sponsor import (
    Sponser,
    SponsersList,
    sponsor_ns,
    sponsors_ns,
    SponserActionsById,
   
)
from resources.cro import CrosList, Cro, cro_ns, cros_ns, CroActionsById
from resources.lab import ZlabsList, Zlab, zlab_ns, zlabs_ns, ZlabActionsById
from resources.site_data import (
    SitedatasList,
    Sitedata,
    site_data_ns,
    sites_data_ns,
    SiteActionsById,
    SiteActionsByEmail,
)
from resources.lab_test import (
    LabtestssList,
    Labtest,
    lab_test_ns,
    lab_tests_ns,
    LabActionsById,
)
 
from resources.meterial import (
    meterial_ns,
    meterials_ns,
    Meterial,
    MeterialsList,
    MeterialActionsById,
)
from resources.cro_protocol import (
    CroProtocol,
    CrosProtocolsList,
    cro_protocol_ns,
    cro_protocols_ns,
    CroProtocolActionsById,
    CroProtocolBySponsorId,
)
from resources.users import (
    login_ns,
    UserLogin,
    SendOTP,
    TokenRefresh,
    CreateDefaultUser,
    user_ns,
    UserRegister,
    UserList,
    users_ns,
    location_ns,
    GetAllStatesFromGivenCountries,
)
from models.users import UserModel
from resources.clab_kit_preparation import (
    clab_kit_preparation_ns,
    clab_kit_preparations_ns,
    kits_ns,
    kits_inventory_ns,
    ClabKitPreparation,
    ClabKitPreparationList,
    ClabKitProtocolActionsById,
    GetProtocolsBySiteId,
    KitsOperation,
    KitsInventoryOperation,
    dashboard_table_ns,
    DashboardTable,
)
from resources.sample_ack import (
    AckclabKitProtocolActionsById,
    AckclabKitPreparation,
    sample_ack_ns,
)
from resources.dashboard import (
    dashboard_ns,
    Dashboard,
)
 
from resources.cell_biology_resources import (
    CellBiologydatasList,
    CellBiologydata,
    cell_biology_data_ns,
    CellBiologyActionsById,
)

from resources.dnagenetics_resource import (
    DnaGeneticsData,
    DnaGeneticsDatasList,
    dna_genetics_data_ns,
    DnaGeneticsActionsById,
)

from resources.questions import(
    training_ns,
    question_ns,
    TrainingList,
    QuestionList
 
)
from models.refresh_token import RefreshTokenModel
from dotenv import load_dotenv
 
# Load environment variables from .env file
 
load_dotenv()
 
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
bluePrint = Blueprint("api", __name__, url_prefix="/api")
api = Api(bluePrint, doc="/doc", title="KITS APPLICATION")
app.register_blueprint(bluePrint)
 
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}:5432/{}".format(
    os.environ.get("DB_USERNAME"),
    os.environ.get("DB_PASSWORD"),
    os.environ.get("DB_IP"),
    os.environ.get("DB_DATABASE"),
)
 
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_size": 100,
    "pool_recycle": 220,
    "pool_pre_ping": True,
    "connect_args": {"connect_timeout": 1000},
}
 
 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=45)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["JWT_SECRET_KEY"] = "J@f@rU5m@9"
# app.config["SECRET_KEY"] = uuid.uuid4().hex
 
jwt = JWTManager(app)
# migrate_db = SQLAlchemy(app)
# migrate = Migrate(app, migrate_db)
 
 
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(RefreshTokenModel.token_id).filter_by(token=jti).scalar()
 
    return token is not None
 
 
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return UserModel.find_by_id(identity)
    # return User.query.filter_by(id=identity).one_or_none()
 
 
@jwt.expired_token_loader
def expired_token_callback(jwt_headers, jwt_payload):
    return (
        jsonify({"description": "The token has expired.", "error": "token_expired"}),
        401,
    )
 
 
@jwt.invalid_token_loader
def invalid_token_callback(
    error,
):  # we have to keep the argument here, since it's passed in by the caller internally
    return (
        jsonify(
            {"description": "Signature verification failed.", "error": "invalid_token"}
        ),
        401,
    )
 
 
@jwt.unauthorized_loader
def missing_token_callback(error):
    return (
        jsonify(
            {
                "description": "Request does not contain an access token.",
                "error": "authorization_required",
            }
        ),
        401,
    )
 
 
@jwt.needs_fresh_token_loader
def token_not_fresh_callback(jwt_headers, jwt_payload):
    return (
        jsonify(
            {"description": "The token is not fresh.", "error": "fresh_token_required"}
        ),
        401,
    )
 
 
@jwt.revoked_token_loader
def revoked_token_callback(jwt_headers, jwt_payload):
    return (
        jsonify(
            {"description": "The token has been revoked.", "error": "token_revoked"}
        ),
        401,
    )
 
 
@app.after_request
def after_request(response):
    # header = response.headers
    # header["Access-Control-Allow-Origin"] = "*"
    response.headers.add("Access-Control-Allow-Origin", "*")
    # response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Headers", "*")
    # response.headers.add("Access-Control-Allow-Methods", "POST,PUT,DELETE,GET")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response
 
 
api.add_namespace(sponsors_ns)
api.add_namespace(sponsor_ns)
api.add_namespace(cro_ns)
api.add_namespace(cros_ns)
api.add_namespace(zlab_ns)
api.add_namespace(zlabs_ns)
api.add_namespace(site_data_ns)
api.add_namespace(sites_data_ns)
api.add_namespace(lab_test_ns)
api.add_namespace(lab_tests_ns)
api.add_namespace(cro_protocol_ns)
api.add_namespace(cro_protocols_ns)
api.add_namespace(login_ns)
api.add_namespace(clab_kit_preparations_ns)
api.add_namespace(clab_kit_preparation_ns)
api.add_namespace(user_ns)
api.add_namespace(location_ns)
api.add_namespace(users_ns)
api.add_namespace(meterials_ns)
api.add_namespace(meterial_ns)
api.add_namespace(sample_ack_ns)
api.add_namespace(dashboard_ns)
api.add_namespace(kits_ns)
api.add_namespace(kits_inventory_ns)
api.add_namespace(dashboard_table_ns)

api.add_namespace(cell_biology_data_ns)
api.add_namespace(dna_genetics_data_ns)

api.add_namespace(training_ns)
api.add_namespace(question_ns)
 
@app.before_first_request
def create_tables():
    db.init_app(app)
    ma.init_app(app)
    db.create_all()
    CreateDefaultUser()
 
 
sponsor_ns.add_resource(Sponser, "")
sponsor_ns.add_resource(SponserActionsById, "/<string:sponsor_id>")
sponsors_ns.add_resource(SponsersList, "")
 
 
cro_ns.add_resource(Cro, "")
cros_ns.add_resource(CrosList, "")
cro_ns.add_resource(CroActionsById, "/<string:cro_id>")
 
zlab_ns.add_resource(Zlab, "")
zlabs_ns.add_resource(ZlabsList, "")
zlab_ns.add_resource(ZlabActionsById, "/<string:lab_id>")
 
site_data_ns.add_resource(Sitedata, "")
site_data_ns.add_resource(SiteActionsById, "/<string:site_id>")
sites_data_ns.add_resource(SitedatasList, "")
sites_data_ns.add_resource(SiteActionsByEmail, "/<string:email>")
lab_test_ns.add_resource(Labtest, "")
lab_tests_ns.add_resource(LabtestssList, "")
lab_test_ns.add_resource(LabActionsById, "/<string:lab_test_id>")
cro_protocol_ns.add_resource(CroProtocol, "")
cro_protocols_ns.add_resource(CrosProtocolsList, "")
cro_protocols_ns.add_resource(CroProtocolBySponsorId, "/<string:sponsor_id>")
cro_protocol_ns.add_resource(CroProtocolActionsById, "/<string:cro_protocol_id>")
sample_ack_ns.add_resource(
    AckclabKitProtocolActionsById, "/<string:cro_protocol_id>/<string:site_id>"
)
sample_ack_ns.add_resource(AckclabKitPreparation, "")
clab_kit_preparations_ns.add_resource(ClabKitPreparationList, "")
clab_kit_preparation_ns.add_resource(ClabKitPreparation, "")
clab_kit_preparation_ns.add_resource(
    ClabKitProtocolActionsById, "/<string:cro_protocol_id>"
)
clab_kit_preparations_ns.add_resource(GetProtocolsBySiteId, "/<string:site_uuid>")
kits_ns.add_resource(KitsOperation, "/<string:protocol_id>/<string:site_uuid>")
kits_inventory_ns.add_resource(KitsInventoryOperation, "/<string:site_uuid>")
dashboard_table_ns.add_resource(DashboardTable, "/<string:protocol_id>")
login_ns.add_resource(SendOTP, "/sendotp")
login_ns.add_resource(UserLogin, "")
login_ns.add_resource(TokenRefresh, "/refreshtoken")
user_ns.add_resource(UserRegister, "/register")
location_ns.add_resource(GetAllStatesFromGivenCountries, "/states")
users_ns.add_resource(UserList, "/<string:user_id>")
meterial_ns.add_resource(Meterial, "")
meterials_ns.add_resource(MeterialsList, "")
meterial_ns.add_resource(MeterialActionsById, "/<string:meterial_id>")
dashboard_ns.add_resource(Dashboard, "")

cell_biology_data_ns.add_resource(CellBiologydata, "")
cell_biology_data_ns.add_resource(CellBiologyActionsById, "/<string:cellbiology_id>")
cell_biology_data_ns.add_resource(CellBiologydatasList, "/pages")

dna_genetics_data_ns.add_resource(DnaGeneticsData, "")
dna_genetics_data_ns.add_resource(DnaGeneticsActionsById, "/<string:dnagenetics_id>")
dna_genetics_data_ns.add_resource(DnaGeneticsDatasList, "/pages")

training_ns.add_resource(QuestionList,"")
question_ns.add_resource(QuestionList,"/<string:training_id>")
 
if __name__ == "__main__":
    excel.init_excel(app)
    if os.environ.get("ENVIRONMENT") == "dev":
        app.run(port=5001, debug=True, host="0.0.0.0")
    elif os.environ.get("ENVIRONMENT") == "testing":
        app.run(port=5002, debug=True, host="0.0.0.0")
    else:
        app.run(port=5000, debug=True, host="0.0.0.0")