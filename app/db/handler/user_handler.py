from data.user import User
from db.cursor.user_cursor import add_user_cursor, modify_user_cursor\
    , delete_user_cursor, is_registed_user_id, get_user_info_for_login, get_user_instance


def add_user(conn, req):
    id = req["id"]
    password = req["password"]
    name = req["name"]
    rank = req["rank"]

    user = User(id, password, name, rank)
    if not is_registed_user(conn, id):
        add_user_cursor(conn, user)
        return True

    else:
        return False


def modify_user(conn, req):
    id = req["id"]
    password = req["password"]
    name = req["name"]
    rank = req["rank"]

    user = User(id, password, name, rank)
    modify_user_cursor(conn, user)


def delete_user(conn, id):
    delete_user_cursor(conn, id)


def is_registed_user(conn, id):
    return is_registed_user_id(conn, id)


def get_login_user(conn, id, pw):
    return get_user_info_for_login(conn, id, pw)


def provide_user_instance(conn, id):
    return get_user_instance(conn, id)
