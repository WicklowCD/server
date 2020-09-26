from api import ma
from api.models.User import User


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    uuid = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    phone = ma.auto_field()
    active = ma.auto_field()
    app_role = ma.auto_field()
    rank = ma.auto_field()
    first_aid = ma.auto_field()
    updated_at = ma.auto_field()
    created_at = ma.auto_field()


user_schema = UserSchema()
users_schema = UserSchema(many=True)
