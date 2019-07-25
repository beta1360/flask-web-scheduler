# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database, bcrypt
from data.user import User
from data.todo import Todo
from data.groups import Groups
from logger import logger
from db.group_handler import find_group_num_by_code


def add_user(req):
    logger.info(">>>> Check group_code : %s", req["group_code"])
    group_num = find_group_num_by_code(req["group_code"])
    logger.info(">>>> Check group_num : %d", group_num)

    user = User(req["id"], bcrypt.generate_password_hash(req["password"]), req["name"], req["rank"], group_num)
    logger.info(">>>> Provided User instance user: %s" % str(user))
    if not is_registed_user(user.id):
        database.session.add(user)
        database.session.commit()
        logger.info(">>>> Added user in DB (user_id::%s)" % user.id)
        return True

    else:
        logger.warning(">>>> Fail to add user in DB (user_id::%s)" % user.id)
        return False


def modify_user(id, req):
    logger.info(">>>> Modify info form from front-end: %s" % req)
    user = User.query.filter_by(id=id).first()

    if req["password"] != '':
        user.password = bcrypt.generate_password_hash(req["password"])

    if req["name"] != '':
        user.name = req["name"]

    if req["rank"] != '':
        user.rank = req["rank"]

    database.session.commit()


def delete_user(id):
    User.query.filter_by(id=id).delete()

    todo_list = Todo.query.filter_by(id=id).all()
    logger.info(">>>> Searching Result todolist in DB::(user: %s):: todolist: %s" % (id,todo_list))
    for todo in todo_list:
        todo.id = ""

    database.session.commit()


def is_registed_user(id):
    user = User.query.filter_by(id=id).first()
    logger.info(">>>> Searching Result user-info in DB::(user: %s)" % user)
    return user is not None if True else False


def get_login_user(id, pw):
    user = User.query.filter_by(id=id).first()
    logger.info(">>>> Searching Result user-info in DB::(user: %s)\n" % user)

    if user is not None:
        if bcrypt.check_password_hash(user.password, pw):
            return user
        else:
            return None
    else:
        return None


def provide_user_instance(id):
    return User.query.filter_by(id=id).first()


def get_user_group(id):
    user = User.query.filter_by(id=id).first()
    return user.group_num
