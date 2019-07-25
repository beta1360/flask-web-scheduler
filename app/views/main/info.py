# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user, logout_user
from db.user_handler import modify_user, delete_user
from db.info_handler import get_min_info, get_detail_info, check_user_password, get_user_information
from data.user import User
from message import response, msg
from home import login_manager
from logger import logger, logging_route

info_app = Blueprint('info', __name__)


@info_app.route('/info/min', methods=["GET"])
@logging_route(url='/info/min', method="GET")
@login_required
def get_minimum_info_route():
    id = current_user.id
    logger.info(">> Request to get minimum info by user_id::%s" % id)

    min_info = get_min_info(id)
    logger.info(">> min_info is %s" % min_info)
    return jsonify(min_info)


@info_app.route('/info/detail', methods=["GET"])
@logging_route(url="/info/detail", method=["GET"])
@login_required
def get_detail_info_route():
    id = current_user.id
    logger.info(">> Request to get detail info by user_id::%s " % id)

    detail_info = get_detail_info(id)
    logger.info(">> detail_info is %s " % detail_info)
    return jsonify(detail_info)


@info_app.route('/info/check', methods=["POST"])
@logging_route(url="/info/ckeck", method=["POST"])
@login_required
def check_password():
    req = request.get_json()
    id = current_user.id
    logger.info(">> Request to check password by user_id::%s " % id)

    if check_user_password(id, req):
        logger.info(">> %d:: %s" % (msg.SUCCESS, msg.GET_AUTH_FROM_INFO))
        return jsonify(
            response.build(code_num=msg.SUCCESS,
                           code_message=msg.GET_AUTH_FROM_INFO))

    else:
        logger.info(">> %d:: %s" % (msg.NOT_VALID_USER, msg.NOT_VALID_PASSWORD_MSG))
        return jsonify(
            response.build(code_num=msg.NOT_VALID_USER,
                           code_message=msg.NOT_VALID_PASSWORD_MSG))


@info_app.route('/info/form', methods=["GET"])
@logging_route(url="/info/form", method=["GET"])
@login_required
def get_info_for_fill_form():
    id = current_user.id
    logger.info(">> Request to info form by user_id::%s " % id)

    data = get_user_information(id)
    logger.info(">> User information(user_id::%s):: %s " % (id, data))
    return jsonify(data)


@info_app.route("/user/modify", methods=["POST"])
@logging_route(url="/user/modify", method="POST")
@login_required
def update_modify_user():
    req = request.get_json()
    id = current_user.id
    logger.info(">> Request to modify info by user_id::%s " % id)
    modify_user(id, req)

    logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_MODIFY_USER))
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msg.SUCCESS_MODIFY_USER))


@info_app.route("/user/delete", methods=["DELETE"])
@logging_route(url="/user/delete", method="DELETE")
@login_required
def delete_user_id():
    user = current_user
    id = user.id
    logger.info(">> Request to delete user by user_id::%s " % id)
    user.is_authenticated = False
    logout_user()
    logger.info(">> Logout complete ")
    delete_user(id)
    logger.info(">> User Information deleted...")

    logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_DELETE_USER))
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msg.SUCCESS_DELETE_USER))
