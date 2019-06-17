from data.todo import Todo
from db.cursor.todo_cursor import add_todo_cursor, \
    modify_todo_cursor, delete_todo_cursor, select_todo_list_cursor, select_todo_by_no


def add_todo(conn, req, user):
    title = req[u'title']
    date_y = req[u"date_y"]
    date_m = req[u"date_m"]
    date_d = req[u"date_d"]
    body = req[u'body']
    level = req[u"level"]
    id = user.id
    name = user.name

    todo = Todo(id, name, title, date_y, date_m, date_d, body, level)
    add_todo_cursor(conn, todo)


def modify_todo(conn, req, user):
    title = req[u"title"]
    date_y = req[u"date_y"]
    date_m = req[u"date_m"]
    date_d = req[u"date_d"]
    body = req[u"body"]
    level = req[u"level"]
    no = req[u"no"]

    todo = Todo(user.id, user.name, title, date_y, date_m, date_d, body, level)
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


def get_todo_component_by_no(conn, no):
    todo = select_todo_by_no(conn, no)
    return {
        "no": todo[0],
        "name": todo[1],
        "title": todo[2],
        "date_y": todo[3],
        "date_m": todo[4],
        "date_d": todo[5],
        "body": todo[6],
        "level": todo[7],
        "id": todo[8]
    }