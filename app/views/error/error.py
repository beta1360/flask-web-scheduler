# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Blueprint, url_for, flash, redirect, request
from views.index.index_view import auth_home
from logger import logger, logging_error_route

error_app = Blueprint('errors', __name__)


# 404 error
@error_app.errorhandler(404)
@logging_error_route(error_code=404, message="Forbidden")
def forbidden(error):
    logger.error("####################[\"%6s %40s In request..\"]###########" % (request.method, request.url))
    logger.warning("Error handler message: %s", error)
    return redirect(url_for('index_view_app.auth_home'), code=302)
