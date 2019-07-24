# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, render_template, jsonify
from flask_login import login_required, current_user
from data.user import User
from util.timestamp import build_timestamp
from db.group_handler import find_group_name_by_num
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


@main_view_app.route("/user/whoami", methods=["GET"])
@logging_route(url="/user/whoami", method="GET")
@login_required
def who_am_i():
    user = current_user
    return jsonify({
        "user_id": user.id,
        "user_name": user.name,
        "group_num": user.group_num,
        "group_name": find_group_name_by_num(user.group_num)
    })
