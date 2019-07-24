# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database
from data.groups import Groups
from data.user import User
from data.todo import Todo
from logger import logger


def get_min_info(id):
    user = User.query.filter_by(id=id).first()
    logger.info(">>>> Select user (by user_id: %s):: %s" % (id, user))
    group = Groups.query.filter_by(group_num=user.group_num).first()
    logger.info(">>>> Select group (by group_num: %d):: %s" % (user.group_num, group))

    return {
        "user_id": id,
        "user_name": user.name,
        "user_rank": user.rank,
        "group": group.group_name
    }


def get_detail_info(id):
    user = User.query.filter_by(id=id).first()
    logger.info(">>>> Select user (by user_id: %s):: %s" % (id, user))
    group = Groups.query.filter_by(group_num=user.group_num).first()
    logger.info(">>>> Select group (by group_num: %d):: %s" % (user.group_num, group))
    todo_list = Todo.query.filter_by(id=id).all()
    logger.info(">>>> Select todo (by user_id: %s):: %s" % (id, todo_list))

    len_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for todo in todo_list:
        # check progress
        if todo.progress == 0:
            len_arr[0] += 1
        elif todo.progress == 1:
            len_arr[1] += 1
        else:  # todo.progress == 2
            len_arr[2] += 1

        # check privacy
        if todo.privacy == 0:
            len_arr[3] += 1
        else:  # todo.privacy == 1
            len_arr[4] += 1

        # check level
        len_arr[todo.level + 4] += 1

    return {
        "user": {
            "user_id": id,
            "user_name": user.name,
            "user_rank": user.rank,
        }
        , "todo": {
            "num": {
                "progress": {
                    "to_do": len_arr[0],
                    "doing": len_arr[1],
                    "done": len_arr[2]
                },
                "privacy": {
                    "_public": len_arr[3],
                    "_private": len_arr[4]
                },
                "level": {
                    "one": len_arr[5],
                    "two": len_arr[6],
                    "three": len_arr[7],
                    "four": len_arr[8],
                    "five": len_arr[9],
                }
            }
        }
        , "group": {
            "group_num": group.group_num,
            "group_name": group.group_name,
            "group_code": group.group_code
        }
    }