# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database, bcrypt
from data.user import User
from logger import logger


def add_user(req):
    user = User(req["id"], bcrypt.generate_password_hash(req["password"]), req["name"], req["rank"])
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
    user = User.query.filter_by(id=id).first()

    if req["password"] != '':
        user.password = req["password"]

    if req["name"] != '':
        user.name = req["name"]

    if req["rank"] != '':
        user.rank = req["rank"]

    database.session.commit()


def delete_user(id):
    User.query.filter_by(id=id).delete()
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
