from datetime import datetime

from flask_jwt_extended import create_access_token

from app.models.User import create_user
from app.models.Search import create_new_search
from app.models.SearchTeam import add_team
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
