from flask import Flask, render_template, jsonify, request, redirect, url_for
from message import response
from message.config import code
from db.handler.user_handler import add_user, modify_user, delete_user, is_registed_user, get_login_user, provide_user_instance
from db.handler.todo_handler import add_todo, modify_todo, delete_todo, select_todo_list, get_todo_component_by_no
from db.dbconn import DBconn
from util.timestamp import build_timestamp
from flask_login import LoginManager, login_user, login_required, current_user, logout_user

app = Flask('__name__')
app.secret_key = 'ab7a06b8ea0cb4436c8b4b4816c724db82c8c375d2a48c7ae37a2e8e3b938238'
dbcon = DBconn()
conn = dbcon.build()
login_manager = LoginManager()
login_manager.init_app(app)
USERS = {}


@app.route("/", methods=["GET"])
def auth_home():
    user = current_user

    if not user.is_authenticated:
        return render_template("index.html", t=build_timestamp()), 200

    else:
        return redirect(url_for("main_home"), code=302)


@app.route("/main", methods=["GET"])
@login_required
def main_home():
    user = current_user
    return render_template("main.html",
                           t=build_timestamp(), user=user.name, user_id=user.id), 200


@app.route("/user/check", methods=["POST"])
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


@app.route("/user/add", methods=["POST"])
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


@app.route("/user/modify", methods=["POST"])
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


@app.route("/user/delete", methods=["DELETE"])
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


@login_manager.user_loader
def user_loader(user_id):
    return provide_user_instance(conn, user_id)


@app.route("/api/login", methods=["POST"])
def login():
    user_id = request.json['user_id']
    user_pw = request.json['user_pw']

    user = get_login_user(conn, user_id, user_pw)

    if not user:
        return jsonify(
            response.build(code_num=code.NOT_VALID_USER,
                           code_message=code.NOT_VALID_USER_MSG)
        ), 200

    else:
        user.is_authenticated = True
        login_user(user, remember=True)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=response.success_to_login(user.name))
        ), 200


@app.route('/api/logout', methods=["POST"])
@login_required
def logout():
    user = current_user
    user.is_authenticated = False
    logout_user()
    return jsonify(
        response.build(code_num=code.SUCCESS,
                       code_message=code.LOGOUT_MESSAGE)
    ), 200


@app.route("/todo/list", methods=["GET"])
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


@app.route("/todo/component", methods=["GET"])
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


@app.route("/todo/add", methods=["POST"])
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


@app.route("/todo/modify", methods=["POST"])
def post_modify_todo():
    req = request.get_json()

    try:
        modify_todo(conn, req)
        return jsonify(
            response.build(code_num=code.SUCCESS,
                           code_message=code.SUCCESS_MODIFY_TODO)
        ), 200
    except:
        return jsonify(
            response.build(code_num=code.FAIL,
                           code_message=code.FAIL_MODIFY_TODO)
        ), 500


@app.route("/todo/delete", methods=["DELETE"])
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


@app.errorhandler(401)
def not_auth_user(error):
    return redirect(url_for("auth_home"), code=302)


if __name__ == '__main__':
    try:
        app.run('0.0.0.0', 8000, debug=True)

    finally:
        conn.close()
