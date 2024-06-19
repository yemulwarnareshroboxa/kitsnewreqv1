from ma import ma
from models.dna_genetics_model import DnaGeneticsModel

class DnaGeneticsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = DnaGeneticsModel
        load_instance = True
        include_fk = True