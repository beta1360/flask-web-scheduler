from data.user import User
from db.cursor.user_cursor import add_user_cursor, modify_user_cursor, delete_user_cursor


def add_user(conn, req):
    id = req["id"]
    password = req["password"]
    name = req["name"]
    rank = req["rank"]

    user = User(id, password, name, rank)
    add_user_cursor(conn, user)


def modify_user(conn, req):
    id = req["id"]
    password = req["password"]
    name = req["name"]
    rank = req["rank"]

    user = User(id, password, name, rank)
    modify_user_cursor(conn, user)


def delete_user(conn, id):
    delete_user_cursor(conn, id)


