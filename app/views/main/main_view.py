# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, render_template
from flask_login import login_required, current_user
from data.user import User
from util.timestamp import build_timestamp
from home import login_manager
from logger import logger, logging_route

main_view_app = Blueprint('main_view', __name__)


@main_view_app.route("/main", methods=["GET"])
@logging_route(url="/main", method="GET")
@login_required
def main_home():
    user = current_user
    logger.info(">> Render \"/main\"(\"main.html\") about user::%s" % user.id)
    return render_template("main.html",
                           t=build_timestamp(), user=user.name, user_id=user.id)
