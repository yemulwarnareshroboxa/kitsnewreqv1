from ma import ma
from models.meterial import MeterialModel


class MeterialSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MeterialModel
        load_instance = True
        include_fk = True
