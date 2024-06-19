from ma import ma
from models.visit_kit import VisitKitDetailsModel


class VisitKitDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = VisitKitDetailsModel
        load_instance = True
        include_fk = True
