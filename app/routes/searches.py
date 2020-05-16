from flask import Blueprint, request, jsonify

from app.models.SearchTeam import add_team, get_team_by_uuid
from app.models.Search import create_new_search, get_all_searches, get_search_by_uuid
from app.models.SearchLog import new_search_log, get_search_log_by_uuid
from app.models.RadioAssignment import new_radio_assignment
from app.models.CommsLog import add_comms_log
from app.schemas.search import searches_schema, search_schema
from app.schemas.search_team import search_teams_schema
from app.schemas.search_log import search_logs_schema
from app.schemas.radio_assignment import radio_assignments_schema
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
    name = data.get('name')
    team_leader = data.get('team_leader')
    medic = data.get('medic')
    responder_1 = data.get('responder_1')
    responder_2 = data.get('responder_2')
    responder_3 = data.get('responder_3')

    team = add_team(search, name, team_leader, medic, responder_1, responder_2, responder_3)

    return jsonify({'id': team.uuid}), 201


@bp.route('/<search_uuid>/teams', methods=['GET'])
@user_required
def get_search_teams_list(search_uuid):
    search = get_search_by_uuid(search_uuid)
    teams = search.teams.all()
    return jsonify(search_teams_schema.dump(teams))


@bp.route('/<search_uuid>/teams/<team_uuid>', methods=['PUT'])
@user_required
def update_search_team(search_uuid, team_uuid):
    data = request.get_json()
    search = get_search_by_uuid(search_uuid)
    team = get_team_by_uuid(team_uuid, search.id)
    team.update({
        'name': data.get('name'),
        'team_leader': data.get('team_leader'),
        'medic': data.get('medic'),
        'responder_1': data.get('responder_1'),
        'responder_2': data.get('responder_2'),
        'responder_3': data.get('responder_1'),
    })

    return jsonify({}), 202


@bp.route('/<search_uuid>/logs/search', methods=['POST'])
@user_required
def create_search_log(search_uuid):
    data = request.get_json()
    search = get_search_by_uuid(search_uuid)
    team = data.get('team')
    area = data.get('area')
    start_time = data.get('start_time')
    end_time = data.get('end_time')
    notes = data.get('notes')
    log = new_search_log(search, team, area, start_time, end_time, notes)

    return jsonify({'id': log.uuid}), 201


@bp.route('/<search_uuid>/logs/search', methods=['GET'])
@user_required
def get_search_logs_list(search_uuid):
    search = get_search_by_uuid(search_uuid)
    logs = search.search_log.all()
    return jsonify(search_logs_schema.dump(logs))


@bp.route('/<search_uuid>/logs/search/<log_uuid>', methods=['PUT'])
@user_required
def update_search_log(search_uuid, log_uuid):
    data = request.get_json()
    search = get_search_by_uuid(search_uuid)
    log = get_search_log_by_uuid(log_uuid, search.id)
    log.update({
        'team': data.get('team'),
        'area': data.get('area'),
        'start_time': data.get('start_time'),
        'end_time': data.get('end_time'),
        'notes': data.get('notes'),
    })

    return jsonify({}), 202


@bp.route('/<search_uuid>/radios', methods=['POST'])
@user_required
def create_radio_assignment(search_uuid):
    data = request.get_json()
    search = get_search_by_uuid(search_uuid)
    call_sign = data.get('call_sign')
    tetra_number = data.get('tetra_number')
    name = data.get('name')
    assignment = new_radio_assignment(search, call_sign, tetra_number, name)

    return jsonify({'id': assignment.uuid}), 201


@bp.route('/<search_uuid>/radios', methods=['GET'])
@user_required
def get_radio_assignments(search_uuid):
    search = get_search_by_uuid(search_uuid)
    assignments = search.radios.all()
    return jsonify(radio_assignments_schema.dump(assignments)), 200


@bp.route('/<search_uuid>/logs/comms', methods=['POST'])
def create_comms_log(search_uuid):
    search = get_search_by_uuid(search_uuid)
    data = request.get_json()
    time = data.get('time')
    call_sign = data.get('call_sign')
    message = data.get('message')
    action = data.get('action')
    log = add_comms_log(search, time, call_sign, message, action)

    return jsonify({'id': log.uuid}), 201
