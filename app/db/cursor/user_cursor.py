import pymysql
from data.user import User
from db.query.user_table import insert_user_tuple, update_user_tuple\
    , delete_user_tuple, select_registed_user, select_login, select_user_instance


def add_user_cursor(conn, user):
    with conn.cursor() as cursor:
        query = insert_user_tuple(user.id, user.password, user.name, user.rank)
        cursor.execute(query)
        conn.commit()


def modify_user_cursor(conn, user):
    with conn.cursor() as cursor:
        query = update_user_tuple(user.password, user.name, user.rank, user.id)
        cursor.execute(query)
        conn.commit()


def delete_user_cursor(conn, id):
    with conn.cursor() as cursor:
        query = delete_user_tuple(id)
        cursor.execute(query)
        conn.commit()


def is_registed_user_id(conn, id):
    with conn.cursor() as cursor:
        query = select_registed_user(id)
        cursor.execute(query)

        if len(cursor.fetchall()) != 0:
            return True

        return False


def get_user_info_for_login(conn, id, pw):
    with conn.cursor() as cursor:
        query = select_login(id, pw)
        cursor.execute(query)

        user = cursor.fetchone()
        if user is None:
            return user 
        else:
            return User(user[0], user[1], user[2], user[3])


def get_user_instance(conn, id):
    with conn.cursor() as cursor:
        query = select_user_instance(id)
        cursor.execute(query)

        user = cursor.fetchone()
        if user is None:
            return user 
        else:
            return User(user[0], user[1], user[2], user[3])

