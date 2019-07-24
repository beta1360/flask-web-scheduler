# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user
from data.user import User
from db.group_handler import enter_group, select_groups, add_group, \
    check_duplicated_group, leave_group, get_group_by_code
from message import response, msg
from home import login_manager
from logger import logger, logging_route

group_app = Blueprint('group', __name__)


@group_app.route('/group/check', methods=["POST"])
@logging_route(url='/group/check', method="POST")
@login_required
def check_group_code():
    req = request.get_json()
    group_code = req[u"group_code"]
    logger.info(">> Request to group_check by user_id::%s & group_code: %s" % (current_user.id, group_code))

    if check_duplicated_group(group_code):
        logger.info(">> %d:: %s" % (msg.DUPLICATE_GROUP, msg.DUPLICATE_GROUP_CODE))
        return jsonify(
            response.build(code_num=msg.DUPLICATE_GROUP,
                           code_message=msg.DUPLICATE_GROUP_CODE))

    else:
        logger.info(">> %d:: %s" % (msg.SUCCESS, msg.NOT_REGISTED_GROUP))
        return jsonify(
            response.build(code_num=msg.SUCCESS,
                           code_message=msg.NOT_REGISTED_GROUP))


@group_app.route('/group/add', methods=["POST"])
@logging_route(url='/group/add', method="POST")
@login_required
def add_group_route():
    req = request.get_json()
    id = current_user.id
    logger.info(">> Request to add group by user_id::%s & group: %s" % (id, req))

    if add_group(id, req):
        logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_ADD_GROUP))
        return jsonify(
            response.build(code_num=msg.SUCCESS,
                           code_message=msg.SUCCESS_ADD_GROUP))

    else:
        logger.info(">> %d:: %s" % (msg.FAIL, msg.FAIL_ADD_GROUP))
        return jsonify(
            response.build(code_num=msg.FAIL,
                           code_message=msg.FAIL_ADD_GROUP))


@group_app.route('/group/list', methods=["GET"])
@logging_route(url='/group/list', method="GET")
@login_required
def get_group_list():
    logger.info(">> Request to select group by user_id::%s" % id)
    return jsonify({"groups": select_groups()})


@group_app.route('/group/enter', methods=["POST"])
@logging_route(url='/group/enter', method="POST")
@login_required
def enter_group_route():
    req = request.get_json()
    group_code = req[u"group_code"]
    id = current_user.id
    logger.info(">> Request to enter group by user_id::%s & group: %s" % (id, req))

    if enter_group(id, group_code):
        logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_ENTER_GROUP))
        return jsonify(
            response.build(code_num=msg.SUCCESS,
                           code_message=msg.SUCCESS_ENTER_GROUP))
    else:
        logger.info(">> %d:: %s" % (msg.FAIL, msg.FAIL_ENTER_GROUP))
        return jsonify(
            response.build(code_num=msg.FAIL,
                           code_message=msg.FAIL_ENTER_GROUP))


@group_app.route('/group/leave', methods=["DELETE"])
@logging_route(url='/group/leave', method="DELETE")
@login_required
def leave_group_route():
    id = current_user.id
    logger.info(">> Request to leave group by user_id::%s" % (id))

    leave_group(id)
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msg.SUCCESS_LEAVE_GROUP))


@group_app.route('/group/info', methods=["POST"])
@logging_route(url='/group/info', method="POST")
@login_required
def get_group_by_code_route():
    req = request.get_json()
    group_code = req[u"group_code"]
    logger.info(">> Request to group info by user_id::%s & group_code:%s" % (id, group_code))

    group = get_group_by_code(group_code)
    logger.info(">> group info => %s" % group)

    return jsonify({"group": group})
