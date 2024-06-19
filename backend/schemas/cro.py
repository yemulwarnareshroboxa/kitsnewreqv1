from ma import ma
from models.cro import CroModel


class CroSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CroModel
        load_instance = True
        include_fk = True
