from ma import ma
from models.cro_protocol import CroProtocolModel


class CroProtocolSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CroProtocolModel
        load_instance = True
        include_fk = True
