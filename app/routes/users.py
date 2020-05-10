from flask_restx import Resource, Namespace, fields
from app.models.User import get_all_users, get_user_by_uuid
from app.decorators import admin_required

ns = Namespace('User Management')

user_schema = ns.model(
    'User',
    {
        'uuid': fields.String,
        'first_name': fields.String,
        'last_name': fields.String,
        'email': fields.String,
        'phone': fields.String,
        'app_role': fields.String,
        'first_aid': fields.String,
        'rank': fields.String,
        'active': fields.Boolean,
    }
)


class Users(Resource):
    @admin_required
    @ns.response(200, 'Users List')
    @ns.marshal_list_with(user_schema)
    def get(self):
        """Returns a list of users"""
        users = get_all_users()
        return users


class User(Resource):
    @admin_required
    @ns.response(200, 'User')
    @ns.marshal_with(user_schema)
    def get(self, uuid):
        """Returns details for a specific user"""
        return get_user_by_uuid(uuid)


class ActivateUser(Resource):
    @admin_required
    @ns.response(202, 'User Activated')
    def post(self, uuid):
        """Activates a users account to enable login"""
        user = get_user_by_uuid(uuid)
        user.activate()
        return True, 202


ns.add_resource(Users, '')
ns.add_resource(User, '/<uuid>')
ns.add_resource(ActivateUser, '/<uuid>/activate')
