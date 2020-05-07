from flask_restx import Api

from app.routes.auth import ns as auth_ns

api = Api(version='1.0.0', title='Wicklow Civil Defence Management API', doc='/docs')

api.add_namespace(auth_ns, path='/auth')
