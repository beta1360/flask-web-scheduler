<<<<<<< HEAD
from flask import Blueprint, jsonify
from flask_login import login_user, login_required, current_user, logout_user
from data.user import User
from db.handler.user_handler import get_login_user
from message import response
from message.config import code
from home import conn, login_manager

logout_app = Blueprint('logout', __name__)


@logout_app.route('/api/logout', methods=["POST"])
@login_required
def logout():
    user = current_user
    user.is_authenticated = False
    logout_user()
    return jsonify(
        response.build(code_num=code.SUCCESS,
                       code_message=code.LOGOUT_MESSAGE)
    ), 200
=======
from flask import Blueprint, jsonify
from flask_login import login_user, login_required, current_user, logout_user
from data.user import User
from db.handler.user_handler import get_login_user
from message import response
from message.config import code
from home import conn, login_manager

logout_app = Blueprint('logout', __name__)


@logout_app.route('/api/logout', methods=["POST"])
@login_required
def logout():
    user = current_user
    user.is_authenticated = False
    logout_user()
    return jsonify(
        response.build(code_num=code.SUCCESS,
                       code_message=code.LOGOUT_MESSAGE)
    ), 200

>>>>>>> ca1daee0aacc18be93a3e8792d606d7617cc6d57
