from datetime import datetime

from flask_jwt_extended import create_access_token

from app.models.User import create_user
from app.models.Search import create_new_search
from app.models.SearchTeam import add_team
from app.models.SearchLog import new_search_log
from app.models.RadioAssignment import new_radio_assignment
from app.models.CommsLog import add_comms_log
from app import db


def create_new_user(first_name='Test', last_name='User', email='test@user.com', phone='0831221436', password='testPass',
                    active=True):
    user = create_user(first_name, last_name, email, phone, password, active)
    user.app_role = 'Read'
    db.session.commit()
    return user


def create_admin_user():
    user = create_new_user()
    user.app_role = 'Admin'
    db.session.commit()
    return user


def authenticate_user(user):
    return create_access_token(user.email, user_claims={
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'role': user.app_role
    })


def create_search():
    return create_new_search('Test Location', str(datetime.today()), datetime.utcnow().strftime('%H:%M'), 'Incident',
                             'Commanding Officer', 'Search Manager', 'Safety Officer', 'Section Leader',
                             'Radio Operator', 'Scribe')


def create_search_team(search):
    return add_team(search, 'Search Team', 'Team Leader', 'Medic', 'Responder 1', 'Responder 2', 'Responder 3')


def create_search_log(search):
    return new_search_log(search, 'Team 1', 'Area', '14:00')


def create_radio_assignment(search):
    return new_radio_assignment(search, 'WW01', '53531', 'Test User')


def create_comms_log(search):
    return add_comms_log(search, '14:00', 'WW01', 'Test Message', 'No Action Required')
