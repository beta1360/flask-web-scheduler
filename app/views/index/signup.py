from flask import Blueprint, jsonify, request
from flask_login import login_user
from data.user import User
from db.handler.user_handler import is_registed_user, add_user
from message import response
from message.config import code
from logger import logger, logging_route

signup_app = Blueprint('signup', __name__)


@signup_app.route("/user/check", methods=["POST"])
@logging_route(url="/user/check", method="POST")
def check_registed_user_route():
    id = request.get_json()["user_id"]
    logger.info(">> Request to check user_id: %s" % id)

    if is_registed_user(id):
        logger.info(">> %d:: %s" % (code.DUPLICATE_USER, code.REGISTED_USER))
        return jsonify(
            response.build(code_num=code.DUPLICATE_USER
                           , code_message=code.REGISTED_USER))

    else:
        logger.info(">> %d:: %s" % (code.SUCCESS, code.NOT_REGISTED_USER))
        return jsonify(
            response.build(code_num=code.SUCCESS
                           , code_message=code.NOT_REGISTED_USER))


@signup_app.route("/user/add", methods=["POST"])
@logging_route(url="/user/add", method="POST")
def post_add_user():
    req = request.get_json()
    logger.info(">> Recieve form" + str(req))

    if add_user(req):
        logger.info(">> %d:: %s" % (code.SUCCESS, code.SUCCESS_ADD_USER))
        return jsonify(
            response.build(code_num=code.SUCCESS
                           , code_message=code.SUCCESS_ADD_USER))

    else:
        logger.warning(">> %d:: %s" % (code.DUPLICATE_USER, code.REGISTED_USER))
        return jsonify(
            response.build(code_num=code.DUPLICATE_USER
                           , code_message=code.REGISTED_USER))
