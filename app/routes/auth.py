from datetime import timedelta

from flask import request, Blueprint, jsonify
from flask_jwt_extended import create_access_token

from app.models.User import create_user, get_user_by_email

bp = Blueprint('auth', __name__)


@bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    response = {}
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')

    existing_user = get_user_by_email(email)

    if existing_user:
        response['message'] = 'Email address already in use'

        return jsonify(response), 400

    create_user(first_name, last_name, email, phone, password, active=False)

    response[
        'message'] = 'User successfully registered, you will receive an email once your registration is confirmed by an administrator'

    return jsonify(response), 201


@bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    response = {}
    email = data.get('email')
    password = data.get('password')

    user = get_user_by_email(email)

    if not user:
        response['message'] = 'Email address or password incorrect'
        return jsonify(response), 400

    if not user.verify_password(password):
        response['message'] = 'Email address or password incorrect'
        return jsonify(response), 400

    if not user.active:
        response['message'] = 'This account is not active, please speak to your unit commander.'
        return jsonify(response), 400

    response['email'] = email
    response['token'] = create_access_token(email, expires_delta=timedelta(days=1), user_claims={
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'role': user.app_role
    })

    return jsonify(response), 200
