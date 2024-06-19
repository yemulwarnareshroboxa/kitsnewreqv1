from ma import ma
from models.clab_kit_preparation import ClabKitPreparationModel


class ClabKitPreparationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ClabKitPreparationModel
        load_instance = True
        include_fk = True
