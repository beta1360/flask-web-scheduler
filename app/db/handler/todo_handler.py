from home import database
from data.todo import Todo


def add_todo(req, user):
    title = req[u'title']
    date_y = req[u"date_y"]
    date_m = req[u"date_m"]
    date_d = req[u"date_d"]
    body = req[u'body']
    level = req[u"level"]
    id = user.id
    name = user.name

    todo = Todo(id, name, title, date_y, date_m, date_d, body, level)
    database.session.add(todo)
    database.session.commit()


def modify_todo(no, req):
    todo = Todo.query.filter_by(no=no).first()

    todo.title = req[u"title"]
    todo.date_y = req[u"date_y"]
    todo.date_m = req[u"date_m"]
    todo.date_d = req[u"date_d"]
    todo.body = req[u"body"]
    todo.level = req[u"level"]

    database.session.commit()


def delete_todo(no):
    Todo.query.filter_by(no=no).delete()
    database.session.commit()


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