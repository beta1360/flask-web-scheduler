from flask import Blueprint, url_for, flash, redirect, request
from views.index.index_view import auth_home
from home import app
from logger import logger, logging_error_route


def error_handler(app):
    # 401 error
    @app.errorhandler(401)
    @logging_error_route(error_code=401, message="Unauthorized")
    def not_auth_user(error):
        logger.error("####################[\"%6s %40s In request..\"]###########" % (request.method, request.url))
        flash("401 :: %s" % error)
        logger.warning("Error handler message: %s", error)
        return redirect(url_for('index_view.auth_home'), code=302)

    # 404 error
    @app.errorhandler(404)
    @logging_error_route(error_code=404, message="Forbidden")
    def forbidden(error):
        logger.error("####################[\"%6s %40s In request..\"]###########" % (request.method, request.url))
        flash("404 :: %s" % error)
        logger.warning("Error handler message: %s", error)
        return redirect(url_for('index_view.auth_home'), code=302)
