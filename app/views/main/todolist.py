# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user, logout_user
from data.user import User
from db.user_handler import modify_user, delete_user
from db.todo_handler import select_todo_list, get_todo_component_by_no, add_todo, modify_todo, delete_todo
from message import response, msg
from home import login_manager
from logger import logger, logging_route

todolist_app = Blueprint('todolist', __name__)


@todolist_app.route("/user/modify", methods=["POST"])
@logging_route(url="/user/modify", method="POST")
@login_required
def update_modify_user():
    modify_user(current_user.id)
    '''
    Not support, yet...
    '''
    return 200


@todolist_app.route("/user/delete", methods=["DELETE"])
@logging_route(url="/user/delete", method="DELETE")
@login_required
def delete_user_id():
    user = current_user
    user.is_authenticated = False
    logout_user()
    delete_user(current_user.id)
    '''
    Not support, yet...
    '''
    return 200


@todolist_app.route("/todo/list", methods=["GET"])
@logging_route(url="/user/list", method="GET")
@login_required
def get_todo_list_in_main():
    id = request.args.get("id")
    logger.info(">> Request to select todo-list by user_id::%s" % id)

    list = select_todo_list(id)
    return jsonify({"todos": list})


@todolist_app.route("/todo/component", methods=["GET"])
@logging_route(url="/todo/component", method="GET")
@login_required
def get_todo_component():
    no = int(request.args.get("no"))
    logger.info(">> Request to select todo(no: %d) by user_id::%s" % (no, id))

    component = get_todo_component_by_no(no)
    logger.info(">> Todo component: %s" % str(component))
    return jsonify(component)


@todolist_app.route("/todo/add", methods=["POST"])
@logging_route(url="/todo/add", method="POST")
@login_required
def post_add_todo():
    req = request.get_json()
    user = current_user

    logger.info(">> Request to add todo by user_id::%s" % user.id)
    add_todo(req, user)

    logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_ADD_TODO))
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msg.SUCCESS_ADD_TODO))


@todolist_app.route("/todo/modify", methods=["POST"])
@logging_route(url="/todo/modify", method="POST")
@login_required
def post_modify_todo():
    req = request.get_json()
    no = int(req["no"])
    logger.info(">> Request data: %s" % str(req))
    logger.info(">> Request to modify todo(no: %d) by user_id::%s" % (no, current_user.id))
    modify_todo(no, req)

    logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_MODIFY_TODO))
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msg.SUCCESS_MODIFY_TODO))


@todolist_app.route("/todo/delete", methods=["DELETE"])
@logging_route(url="/todo/delete", method="DELETE")
@login_required
def delete_todo_no():
    no = int(request.args.get("no"))

    logger.info(">> Request to delete todo(no: %d) by user_id::%s" % (no, current_user.id))
    delete_todo(no, current_user.id)

    logger.info(">> %d:: %s" % (msg.SUCCESS, msg.SUCCESS_DELETE_TODO))
    return jsonify(
        response.build(code_num=msg.SUCCESS,
                       code_message=msg.SUCCESS_DELETE_TODO))