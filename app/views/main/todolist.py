from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user
from data.user import User
from db.handler.user_handler import modify_user, delete_user
from db.handler.todo_handler import select_todo_list, get_todo_component_by_no, add_todo, modify_todo, delete_todo
from message import response
from message.config import code
from home import conn, login_manager

todolist_app = Blueprint('todolist', __name__)


@todolist_app.route("/user/modify", methods=["POST"])
@login_required
def update_modify_user():
    req = request.get_json()

    try:
        modify_user(conn, req)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_MODIFY_USER)
        ), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_MODIFY_USER)
        ), 500


@todolist_app.route("/user/delete", methods=["DELETE"])
@login_required
def delete_user_id():
    id = request.args.get("id")

    try:
        delete_user(conn, id)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_DELETE_USER)
        ), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_DELETE_USER)
        ), 500


@todolist_app.route("/todo/list", methods=["GET"])
@login_required
def get_todo_list_in_main():
    id = request.args.get("id")

    try:
        list = select_todo_list(conn, id)
        return jsonify({"todos": list}), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_SELECT_TODO)
        ), 500


@todolist_app.route("/todo/component", methods=["GET"])
@login_required
def get_todo_component():
    no = request.args.get("no")

    try:
        component = get_todo_component_by_no(conn, no)
        return jsonify(component), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_SELECT_TODO)
        ), 500


@todolist_app.route("/todo/add", methods=["POST"])
@login_required
def post_add_todo():
    req = request.get_json()
    user = current_user

    try:
        add_todo(conn, req, user)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_ADD_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_ADD_TODO)
        ), 500


@todolist_app.route("/todo/modify", methods=["POST"])
@login_required
def post_modify_todo():
    req = request.get_json()
    user = current_user

    try:
        modify_todo(conn, req, user)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_MODIFY_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_MODIFY_TODO)
        ), 500


@todolist_app.route("/todo/delete", methods=["DELETE"])
@login_required
def delete_todo_no():
    no = int(request.args.get("no"))

    try:
        delete_todo(conn, no)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_DELETE_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_DELETE_TODO)
        ), 500