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


def select_todo_list(id):
    todo_table = []
    list = Todo.query.filter_by(id=id)\
        .order_by(Todo.no.desc())\
        .all()

    for todo in list:
        todo_table.append({
            "no": todo.no,
            "title": todo.title,
            "name": todo.name,
            "date_y": todo.date_y,
            "date_m": todo.date_m,
            "date_d": todo.date_d,
            "level": todo.level,
            "id": todo.id
        })

    return todo_table


def get_todo_component_by_no(no):
    todo = Todo.query.filter_by(no=no).first()
    return {
        "no": todo.no,
        "name": todo.name,
        "title": todo.title,
        "date_y": todo.date_y,
        "date_m": todo.date_m,
        "date_d": todo.date_d,
        "body": todo.body,
        "level": todo.level,
        "id": todo.id
    }