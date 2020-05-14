from flask import Blueprint, request, jsonify

from app.models.SearchTeam import add_team
from app.models.Search import create_new_search, get_all_searches, get_search_by_uuid
from app.schemas.search import searches_schema, search_schema
from app.schemas.search_team import search_teams_schema
from app.decorators import admin_required, user_required, write_required

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


@bp.route('/<search_uuid>/teams', methods=['POST'])
@write_required
def add_search_team(search_uuid):
    search = get_search_by_uuid(search_uuid)
    data = request.get_json()
    team_leader = data.get('team_leader')
    medic = data.get('medic')
    responder_1 = data.get('responder_1')
    responder_2 = data.get('responder_2')
    responder_3 = data.get('responder_3')

    team = add_team(search, team_leader, medic, responder_1, responder_2, responder_3)

    return jsonify({'id': team.uuid}), 201


@bp.route('/<search_uuid>/teams', methods=['GET'])
@user_required
def get_search_teams_list(search_uuid):
    search = get_search_by_uuid(search_uuid)
    teams = search.teams.all()
    return jsonify(search_teams_schema.dump(teams))
