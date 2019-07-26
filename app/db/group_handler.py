# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database
from data.groups import Groups
from data.user import User
from logger import logger
from util.convert_group_privacy import group_private_deconverter, group_private_converter


def check_duplicated_group(group_code):
    group = Groups.query.filter_by(group_code=group_code).all()
    logger.info(">>>> Check groups: num = %d" % len(group))

    if len(group) != 0:
        return True
    else:
        return False


def add_group(id, req):
    group_code = req[u"group_code"]
    group_name = req[u"group_name"]
    privacy = group_private_converter(req[u"privacy"])
    logger.info(">>>> group_code: %s, group_name: %s, privacy: %s" % (group_code, group_name, privacy))

    if get_user_group_num_by_id(id) != 1:
        logger.info(">>>> Duplicated group user... (user_id: %s) " % id)
        return False

    if check_duplicated_group(group_code):
        logger.info(">>>> Duplicated group code: %s " % group_code)
        return False

    group = Groups(None, group_name, group_code, privacy)
    database.session.add(group)
    database.session.commit()
    logger.info(">>>> Insert group in groups table. Group(null, %s, %s)" % (group_name, group_code))

    group = Groups.query.filter_by(group_code=group_code).first()
    user = User.query.filter_by(id=id).first()
    user.group_num = group.group_num
    database.session.commit()
    logger.info(">>>> Modify user group =>  group_num:: %d " % group.group_num)
    return True


def select_groups():
    list = []
    groups = Groups.query.filter((Groups.group_num != 1) & (Groups.privacy == 0))\
        .order_by(Groups.group_num.desc()).all()
    logger.info(">>>> Select groups-len:: %d" % len(groups))

    for group in groups:
        list.append({
            "group_name": group.group_name,
            "group_num": group.group_num,
            "group_code": group.group_code
        })

    logger.info(">>>> Groups length: %d" % len(groups))
    return list


def enter_group(id, group_code):
    if not check_duplicated_group(group_code):
        logger.info(">>>> Not exist group code: %s " % group_code)
        return False

    if get_user_group_num_by_id(id) != 1:
        logger.info(">>>> Duplicated group user... (user_id: %s) " % id)
        return False

    group = Groups.query.filter_by(group_code=group_code).first()
    logger.info(">>>> Get group_num(%d) by group_code(%s) " % (group.group_num, group.group_code))
    user = User.query.filter_by(id=id).first()
    logger.info(">>>> Get user_id: %s" % id)
    user.group_num = group.group_num

    database.session.add(user)
    database.session.commit()
    logger.info(">>>> Modify user group =>  group_num:: %d " % group.group_num)
    return True


def leave_group(id):
    user = User.query.filter_by(id=id).first()
    logger.info(">>>> User group_num: %d (user_id: %s)" % (user.group_num, id))
    user.group_num = 1
    database.session.add(user)
    database.session.commit()


def find_group_num_by_code(group_code):
    group = Groups.query.filter_by(group_code=group_code).all()

    if len(group) == 0:
        return 1

    return group[0].group_num


def find_group_info_by_num(group_num):
    group = Groups.query.filter_by(group_num=group_num).first()
    return {
        "group_name": group.group_name,
        "group_privacy": group.privacy
    }


def get_user_group_num_by_id(id):
    user = User.query.filter_by(id=id).first()
    return user.group_num


def get_group_by_code(group_code):
    group = Groups.query.filter_by(group_code=group_code).first()
    logger.info(">>>> Get group by group_code: %s " % group_code)

    if group is not None:
        return {
            "group_num": group.group_num,
            "group_name": group.group_name
        }
    else:
        return 1
