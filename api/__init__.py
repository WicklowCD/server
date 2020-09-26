import sentry_sdk
from os import path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from sentry_sdk.integrations.flask import FlaskIntegration

from config import Config

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
bcrypt = Bcrypt()
cors = CORS()
jwt = JWTManager()


def create_app(config_class=Config):
    static_path = path.abspath(
        path.join(path.dirname(__file__), "..", "client", "build", "static")
    )
    app = Flask(__name__, static_folder=static_path)
    app.config.from_object(config_class)

    sentry_sdk.init(dsn=app.config["SENTRY_DSN"], integrations=[FlaskIntegration()])

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)

    from api.routes.auth import bp as auth_bp
    from api.routes.users import bp as users_bp
    from api.routes.search import bp as searches_bp
    from api.routes.static import bp as static_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(searches_bp, url_prefix="/api/searches")
    app.register_blueprint(static_bp)

    return app
