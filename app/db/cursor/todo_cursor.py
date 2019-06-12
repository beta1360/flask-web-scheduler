import pymysql
from data import todo
from db.query.todo_table import insert_todo_tuple, update_todo_tuple, delete_todo_tuple


def add_todo_cursor(conn, todo):
    with conn.cursor() as cursor:
        query = insert_todo_tuple(todo.name, todo.title,
                                  todo.date_y, todo.date_m, todo.date_d,
                                  todo.body, todo.level)
        cursor.execute(query)
        conn.commit()


def modify_todo_cursor(conn, todo, no):
    with conn.cursor() as cursor:
        query = update_todo_tuple(todo.title,
                                  todo.date_y, todo.date_m, todo.date_d,
                                  todo.body, todo.level, no)
        cursor.execute(query)
        conn.commit()


def delete_todo_cursor(conn, no):
    with conn.cursor() as cursor:
        query = delete_todo_tuple(no)
        cursor.execute(query)
        conn.commit()