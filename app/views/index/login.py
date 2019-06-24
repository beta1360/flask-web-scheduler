from flask import Blueprint, jsonify, request
from flask_login import login_user, current_user
from data.user import User
from db.handler.user_handler import get_login_user
from message import response
from message.config import code
from home import login_manager
from logger import logger, logging_route

login_app = Blueprint('login', __name__)


@login_app.route("/api/login", methods=["POST"])
@logging_route(url="/api/login", method="POST")
def login():
    user_id = request.json['user_id']
    user_pw = request.json['user_pw']
    logger.info(">> Login request by user::%s" % user_id)

    user = get_login_user(user_id, user_pw)

    if user is None:
        logger.info(">> %d:: %s" % (code.NOT_VALID_USER, code.NOT_VALID_USER_MSG))
        return jsonify(
            response.build(code_num=code.NOT_VALID_USER,
                           code_message=code.NOT_VALID_USER_MSG))

    else:
        logger.info(">> Connect user session with user_id::%s" % user.id)
        user.is_authenticated = True
        login_user(user, remember=True)

        logger.info(">> %d:: %s" % (code.SUCCESS, response.success_to_login(user.name)))
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=response.success_to_login(user.name)))
