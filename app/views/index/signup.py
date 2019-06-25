# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, jsonify, request
from flask_login import login_user
from data.user import User
from db.user_handler import is_registed_user, add_user
from message import response, msg
from logger import logger, logging_route

signup_app = Blueprint('signup', __name__)


@signup_app.route("/user/check", methods=["POST"])
@logging_route(url="/user/check", method="POST")
def check_registed_user_route():
    id = request.get_json()["user_id"]
    logger.info(">> Request to check user_id: %s" % id)

    if is_registed_user(id):
        logger.info(">> %d:: %s" % (msg.DUPLICATE_USER, msg.REGISTED_USER))
        return jsonify(
            response.build(code_num=msg.DUPLICATE_USER
                           , code_message=msg.REGISTED_USER))

    else:
        logger.info(">> %d:: %s" % (msg.SUCCESS, msg.NOT_REGISTED_USER))
        return jsonify(
            response.build(code_num=msg.SUCCESS
                           , code_message=msg.NOT_REGISTED_USER))


@signup_app.route("/user/add", methods=["POST"])
@logging_route(url="/user/add", method="POST")
def post_add_user():
    req = request.get_json()
    logger.info(">> Recieve form" + str(req))

    if add_user(req):
        logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_ADD_USER))
        return jsonify(
            response.build(code_num=msg.SUCCESS
                           , code_message=msg.SUCCESS_ADD_USER))

    else:
        logger.warning(">> %d:: %s" % (msg.DUPLICATE_USER, msg.REGISTED_USER))
        return jsonify(
            response.build(code_num=msg.DUPLICATE_USER
                           , code_message=msg.REGISTED_USER))
