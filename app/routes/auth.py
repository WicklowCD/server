from flask import request
from flask_restx import Resource, Namespace, fields

from app import db
from app.models.User import User, create_user

ns = Namespace('auth')

registration_schema = ns.model(
    'UserRegistration',
    {
        'first_name': fields.String(required=True),
        'last_name': fields.String(required=True),
        'email': fields.String(required=True),
        'phone': fields.String(required=True),
        'password': fields.String(required=True),
    }
)


class Register(Resource):
    @ns.expect(registration_schema, validate=True)
    @ns.response(201, 'Account Created')
    def post(self):
        """Registers a new user account"""
        data = request.get_json()
        response = {}
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')

        create_user(first_name, last_name, email, phone, password)

        response[
            'message'] = 'User successfully registered, you will receive an email once your registration is confirmed by an administrator'

        return response, 201


ns.add_resource(Register, '/register')
