from flask import Blueprint, request, jsonify

from app.models.Search import create_new_search, get_all_searches, searches_schema, search_schema, get_search_by_uuid
from app.decorators import admin_required, user_required

bp = Blueprint('searches', __name__)


@bp.route('', methods=['POST'])
@admin_required
def create_search():
    data = request.get_json()
    location = data.get('location')
    date = data.get('date')
    start_time = data.get('start_time')
    type = data.get('type')
    oic = data.get('oic')
    sm = data.get('sm')
    so = data.get('so')
    sl = data.get('sl')
    ro = data.get('ro')
    scribe = data.get('scribe')

    search = create_new_search(location, date, start_time, type, oic, sm, so, sl, ro, scribe)

    return jsonify({'id': str(search.uuid)}), 201


@bp.route('', methods=['GET'])
@user_required
def get_searches():
    searches = get_all_searches()
    return jsonify(searches_schema.dump(searches))


@bp.route('/<uuid>', methods=['GET'])
@user_required
def get_search(uuid):
    search = get_search_by_uuid(uuid)
    return jsonify(search_schema.dump(search))
