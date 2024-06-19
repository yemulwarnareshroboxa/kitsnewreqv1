from ma import ma
from models.cell_biology_model import cellBiologyModel

class CellBiologySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = cellBiologyModel
        load_instance = True
        include_fk = True