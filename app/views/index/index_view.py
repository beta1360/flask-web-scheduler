# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user
from views.main.main_view import main_home
from data.user import User
from util.timestamp import build_timestamp
from home import login_manager
from logger import logger, logging_route

index_view_app = Blueprint('index_view', __name__)


@index_view_app.route("/", methods=["GET"])
@logging_route(url="/", method="GET")
def auth_home():
    user = current_user

    if not user.is_authenticated:
        logger.info(">> Render \"/\"(\"index.html\")")
        return render_template("index.html", t=build_timestamp())

    else:
        logger.info(">> Redirect to \"/main\"(\"main.html\"):: user_id = %s", user.id)
        return redirect(url_for("main_view.main_home"), code=302)
