from flask import Blueprint, jsonify

from app.models.User import get_all_users, get_user_by_uuid, user_schema, users_schema
from app.decorators import admin_required, user_required

bp = Blueprint('users', __name__)


@bp.route('', methods=['GET'])
@admin_required
def get_users_list():
    print('hello')
    users = get_all_users()
    return jsonify(users_schema.dump(users))


@bp.route('/<uuid>', methods=['GET'])
@user_required
def get_user(uuid):
    user = get_user_by_uuid(uuid)
    return jsonify(user_schema.dump(user))


@bp.route('/<uuid>/activate', methods=['POST'])
@admin_required
def activate_user(uuid):
    response = {}
    user = get_user_by_uuid(uuid)
    user.activate()
    response['message'] = 'User activated'
    return jsonify(response), 202
