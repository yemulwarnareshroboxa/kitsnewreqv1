from ma import ma
from models.screening_kit import ScreeningKitDetailsModel


class ScreeningKitDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ScreeningKitDetailsModel
        load_instance = True
        include_fk = True
