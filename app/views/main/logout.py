from flask import Blueprint, jsonify
from flask_login import login_user, login_required, current_user, logout_user
from data.user import User
from db.handler.user_handler import get_login_user
from message import response
from message.config import code
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
        response.build(code_num=code.SUCCESS,
                       code_message=code.LOGOUT_MESSAGE))

