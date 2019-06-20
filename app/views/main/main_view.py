from flask import Blueprint, render_template
from flask_login import login_required, current_user
from data.user import User
from util.timestamp import build_timestamp
from home import login_manager

main_view_app = Blueprint('main_view', __name__)


@main_view_app.route("/main", methods=["GET"])
@login_required
def main_home():
    user = current_user
    return render_template("main.html",
                           t=build_timestamp(), user=user.name, user_id=user.id), 200