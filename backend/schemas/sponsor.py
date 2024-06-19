from ma import ma
from models.sponsor import SponsorModel


class SponsorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SponsorModel
        load_instance = True

        include_fk = True
