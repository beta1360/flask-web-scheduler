# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, jsonify
from flask_login import login_user, login_required, current_user, logout_user
from data.user import User
from db.user_handler import get_login_user
from message import response, msg
from home import login_manager
from logger import logger, logging_route

logout_app = Blueprint('logout', __name__)


@logout_app.route('/api/logout', methods=["POST"])
@logging_route(url='/api/logout', method="POST")
@login_required
def logout():
    user = current_user
    logger.info(">> Logout request by user_id::%s" % user.id)
    user.is_authenticated = False
    logout_user()

    logger.info(">> %d:: %s" % (code.SUCCESS, code.LOGOUT_MESSAGE))
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msgLOGOUT_MESSAGE))

