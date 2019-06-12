import pymysql
from data import user
from db.query.user_table import insert_user_tuple, update_user_tuple, delete_user_tuple


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