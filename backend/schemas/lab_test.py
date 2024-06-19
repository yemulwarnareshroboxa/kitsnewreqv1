from ma import ma
from models.lab_test import LabtestModel


class LabtestSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LabtestModel
        load_instance = True
        include_fk = True
