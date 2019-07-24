# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user
from db.info_handler import get_min_info, get_detail_info
from data.user import User
from message import response, msg
from home import login_manager
from logger import logger, logging_route

info_app = Blueprint('info', __name__)


@info_app.route('/info/min', methods=["GET"])
@logging_route(url='/info/min', method="GET")
@login_required
def get_minimum_info_route():
    id = current_user.id
    logger.info(">> Request to get minimum info by user_id::%s" % id)

    min_info = get_min_info(id)
    logger.info(">> min_info is %s" % min_info)
    return jsonify(min_info)


@info_app.route('/info/detail', methods=["GET"])
@logging_route(url="/info/detail", method=["GET"])
@login_required
def get_detail_info_route():
    id = current_user.id
    logger.info(">> Request to get detail info by user_id::%s " % id)

    detail_info = get_detail_info(id)
    logger.info(">> detail_info is %s " % detail_info)
    return jsonify(detail_info)
