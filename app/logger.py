# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

import logging
from logging import FileHandler, Formatter
from functools import wraps

logger = logging.getLogger("todoScheduler")
filename = "./log/ServerLog.log"
file_handler = FileHandler(filename=filename, mode='a', encoding='utf-8')
formatter = Formatter(
    "[%(process)d:%(processName)s:%(thread)d:%(threadName)s] %(asctime)s : %(message)-100s [in %(pathname)s:%(lineno)d]")
file_handler.setFormatter(formatter)
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)


def logging_route(url, method):
    def set_logging(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            logger.info("========================================[\"%s \"%s\" In request..\"]===================="
                        % (method, url))
            try:
                return f(*args, **kwargs)

            except Exception as e:
                logger.error("###############################################[[  EXCEPTION  ]]###################")
                logger.error(">=>=>" + str(e))
                logger.error("#####################################################################################")

        return wrapper
    return set_logging


def logging_error_route(error_code, message):
    def set_error_logging(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            logger.warning("\#####################################[\"%d %s In request..\"]########################"
                           % (error_code, message))
            return f

        return wrapper
    return set_error_logging
