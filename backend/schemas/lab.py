from ma import ma
from models.lab import LabModel


class LabSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LabModel
        load_instance = True
        include_fk = True
