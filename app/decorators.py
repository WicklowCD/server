from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_claims
from flask import abort


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['role'] != 'Admin':
            abort(403)
        else:
            return fn(*args, **kwargs)

    return wrapper


def write_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['role'] != 'Admin' and claims['role'] != 'Write':
            abort(403)
        else:
            return fn(*args, **kwargs)

    return wrapper


def user_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        return fn(*args, **kwargs)

    return wrapper
