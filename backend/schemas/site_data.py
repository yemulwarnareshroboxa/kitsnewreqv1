from ma import ma
from models.site_data import SiteDataModel


class SiteDataSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SiteDataModel
        load_instance = True

        include_fk = True
