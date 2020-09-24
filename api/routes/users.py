from flask import Blueprint, jsonify, request

from api.models.User import get_all_users, get_user_by_uuid
from api.schemas.user import user_schema, users_schema
from api.decorators import admin_required, user_required

bp = Blueprint("users", __name__)


@bp.route("", methods=["GET"])
@admin_required
def get_users_list():
    users = get_all_users()
    return jsonify(users_schema.dump(users))


@bp.route("/<uuid>", methods=["GET"])
@user_required
def get_user(uuid):
    user = get_user_by_uuid(uuid)
    return jsonify(user_schema.dump(user))


@bp.route("/<uuid>", methods=["PUT"])
@admin_required
def update_user(uuid):
    user = get_user_by_uuid(uuid)
    data = request.get_json()
    user.update(
        {
            "first_name": data.get("first_name"),
            "last_name": data.get("last_name"),
            "email": data.get("email"),
            "phone": data.get("phone"),
            "active": data.get("active"),
            "rank": data.get("rank"),
            "first_aid": data.get("first_aid"),
            "app_role": data.get("app_role"),
        }
    )
    return jsonify({}), 202


@bp.route("/<uuid>/activate", methods=["POST"])
@admin_required
def activate_user(uuid):
    response = {}
    user = get_user_by_uuid(uuid)
    user.activate()
    response["message"] = "User activated"
    return jsonify(response), 202
