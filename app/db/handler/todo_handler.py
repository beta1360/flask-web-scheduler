from data.todo import Todo
from db.cursor.todo_cursor import add_todo_cursor, modify_todo_cursor, delete_todo_cursor


def add_todo(conn, req):
    name = req["name"]
    title = req["title"]
    date_y = req["date_y"]
    date_m = req["date_m"]
    date_d = req["date_d"]
    body = req["body"]
    level = req["level"]

    todo = Todo(name, title, date_y, date_m, date_d, body, level)
    add_todo_cursor(conn, todo)


def modify_todo(conn, req):
    name = req["name"]
    title = req["title"]
    date_y = req["date_y"]
    date_m = req["date_m"]
    date_d = req["date_d"]
    body = req["body"]
    level = req["level"]
    no = req["no"]

    todo = Todo(name, title, date_y, date_m, date_d, body, level)
    modify_todo_cursor(conn, todo, no)


def delete_todo(conn, no):
    delete_todo_cursor(conn, no)