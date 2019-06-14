from data.todo import Todo
from db.cursor.todo_cursor import add_todo_cursor, \
    modify_todo_cursor, delete_todo_cursor, select_todo_list_cursor


def add_todo(conn, req):
    name = req["name"]
    title = req["title"]
    date_y = req["date_y"]
    date_m = req["date_m"]
    date_d = req["date_d"]
    body = req["body"]
    level = req["level"]
    id = req["id"]

    todo = Todo(id, name, title, date_y, date_m, date_d, body, level)
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


def select_todo_list(conn, id):
    todo_table = []
    list = select_todo_list_cursor(conn, id)

    for todo in list:
        todo_table.append({
            "no": todo[0],
            "title": todo[1],
            "name": todo[2],
            "date_y": todo[3],
            "date_m": todo[4],
            "date_d": todo[5],
            "level": todo[6],
            "id": todo[7]
        })

    return todo_table