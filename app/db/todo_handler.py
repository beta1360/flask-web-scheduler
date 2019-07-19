# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database
from data.todo import Todo
from logger import logger
from db.user_handler import get_user_group
from util.convert_progress import progress_converter, progress_deconverter
from util.convert_privacy import privacy_converter, privacy_deconverter


def add_todo(req, user):
    title = req[u'title']
    date_y = req[u"date_y"]
    date_m = req[u"date_m"]
    date_d = req[u"date_d"]
    body = req[u'body']
    level = req[u"level"]
    id = user.id
    name = user.name
    progress = 0
    privacy = 0

    todo = Todo(id, name, title, date_y, date_m, date_d, body, level, progress, privacy, 1)
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
    todo.progress = progress_converter(req[u"progress"])
    todo.privacy = privacy_converter(req[u"privacy"])

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
    group_num = get_user_group(id)
    logger.info(">>>> Select (by user_id::%s) => group_num of user::%d" % (id, group_num))

    list = Todo.query.filter((Todo.id == id) | ((Todo.privacy ==0) & (Todo.group_num == group_num)))\
        .order_by(Todo.no.desc()).all()
    logger.info(">>>> Select todo-list(user_id::%s) => num of todo::%d" % (id, len(list)))

    for todo in list:
        todo_table.append({
            "no": todo.no,
            "title": todo.title,
            "name": todo.name,
            "date_y": todo.date_y,
            "date_m": todo.date_m,
            "date_d": todo.date_d,
            "body": todo.body,
            "level": todo.level,
            "id": todo.id,
            "progress": progress_deconverter(todo.progress),
            "privacy": privacy_deconverter(todo.privacy),
            "group_num": todo.group_num
        })

    logger.info(">>>> Selected todo-list::%s (user_id::%s)" % (str(todo_table), id))
    return todo_table


def modify_todo_progress(no, progress):
    todo = Todo.query.filter_by(no=no).first()
    logger.info(">>>> Select Todo instance todo(no: %d): %s" % (todo.no, str(todo)))

    logger.info(">>>> Before progress -> %s ( to %s )" % (progress_deconverter(todo.progress), progress))
    todo.progress = int(progress_converter(progress))
    logger.info(">>>> After progress -> %s" % progress_deconverter(todo.progress))

    logger.info(">>>> Modified Todo-progress(no: %d) by user_id::%s" % (todo.no, todo.id))
    logger.info(">>>> Todo::%s" % str(todo))
    database.session.commit()
    logger.info(">>>> Modified todo in DB (todo_no::%s & user_id::%s)" % (todo.no, todo.id))