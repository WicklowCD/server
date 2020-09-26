import os
from flask import Blueprint, send_from_directory

bp = Blueprint("static", __name__)

client_path = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "client", "build")
)


@bp.route("/", defaults={"path": ""})
@bp.route("/<path:path>")
def index(path):
    return send_from_directory(client_path, "index.html")


@bp.route("/<path:filename>")
def custom_static(filename):
    return send_from_directory(os.path.join(client_path, "static"), filename)
