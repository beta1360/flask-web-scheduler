from flask import Blueprint, render_template
from flask_login import login_required, current_user
from data.user import User
from util.timestamp import build_timestamp
from home import login_manager

index_view_app = Blueprint('index_view', __name__)


@index_view_app.route("/", methods=["GET"])
def auth_home():
    user = current_user

    if not user.is_authenticated:
        return render_template("index.html", t=build_timestamp()), 200

    else:
        return redirect(url_for("main_home"), code=302)