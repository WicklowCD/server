from app import ma
from app.models.Search import Search


class SearchSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Search

    uuid = ma.auto_field()
    location = ma.auto_field()
    date = ma.auto_field()
    start_time = ma.auto_field()
    end_time = ma.auto_field()
    type = ma.auto_field()
    oic = ma.auto_field()
    sm = ma.auto_field()
    so = ma.auto_field()
    sl = ma.auto_field()
    ro = ma.auto_field()
    scribe = ma.auto_field()
    notes = ma.auto_field()


search_schema = SearchSchema()
searches_schema = SearchSchema(many=True)
