from home import database
from data.todo import Todo
from logger import logger


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
    logger.info(">>>> Provided Todo instance todo: %s" % str(todo))

    database.session.add(todo)
    database.session.commit()
    logger.info(">>>> Added todo in DB (todo_no::%s & user_id::%s)" % (todo.no, user.id))


def modify_todo(no, req):
    todo = Todo.query.filter_by(no=no).first()
    logger.info(">>>> Select Todo instance todo(no: %d): %s" % (todo.no, str(todo)))

    todo.title = req[u"title"]
    todo.date_y = req[u"date_y"]
    todo.date_m = req[u"date_m"]
    todo.date_d = req[u"date_d"]
    todo.body = req[u"body"]
    todo.level = req[u"level"]

    logger.info(">>>> Modified Todo(no: %d) by user_id::%s" % (todo.no, todo.id))
    logger.info(">>>> Todo::%s" % str(todo))
    database.session.commit()
    logger.info(">>>> Modified todo in DB (todo_no::%s & user_id::%s)" % (todo.no, todo.id))


def delete_todo(no, id):
    Todo.query.filter_by(no=no, id=id).delete()
    database.session.commit()
    logger.info(">>>> Deleted todo in DB (todo_no::%s & user_id::%s)" % (no, id))


def select_todo_list(id):
    todo_table = []
    list = Todo.query.filter_by(id=id)\
        .order_by(Todo.no.desc())\
        .all()
    logger.info(">>>> Select todo-list(user_id::%s) => num of todo::%d" % (id, len(list)))

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

    logger.info(">>>> Selected todo-list::%s (user_id::%s)" % (str(todo_table), id))
    return todo_table


def get_todo_component_by_no(no):
    todo = Todo.query.filter_by(no=no).first()
    logger.info(">>>> Select todo(no: %d) by user_id::%s" % (no, todo.id))
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
