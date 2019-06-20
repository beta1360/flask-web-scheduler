from flask import Blueprint, jsonify, request
from flask_login import login_user
from data.user import User
from db.handler.user_handler import is_registed_user, add_user
from message import response
from message.config import code
from home import conn

signup_app = Blueprint('signup', __name__)


@signup_app.route("/user/check", methods=["POST"])
def check_registed_user_route():
    id = request.get_json()["user_id"]

    if is_registed_user(conn, id):
        return jsonify(
            response.build(code_num=code.DUPLICATE_USER,
                           code_message=code.REGISTED_USER)
        ), 200
    else:
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.NOT_REGISTED_USER)
        ), 200


@signup_app.route("/user/add", methods=["POST"])
def post_add_user():
    req = request.get_json()

    try:
        if add_user(conn, req):
            return jsonify(
                response.build(code_num=code.SUCCESS,
                               code_message=code.SUCCESS_ADD_USER)
            ), 200
        else:
            return jsonify(
                response.build(code_num=code.DUPLICATE_USER,
                               code_message=code.REGISTED_USER)
            ), 200

    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_ADD_USER)
        ), 500