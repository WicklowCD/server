from api import ma
from api.models.RadioAssignment import RadioAssignment


class RadioAssignmentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = RadioAssignment

    uuid = ma.auto_field()
    search_id = ma.auto_field()
    call_sign = ma.auto_field()
    tetra_number = ma.auto_field()
    name = ma.auto_field()


radio_assignment_schema = RadioAssignmentSchema()
radio_assignments_schema = RadioAssignmentSchema(many=True)
