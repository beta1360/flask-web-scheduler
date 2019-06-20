from flask import Blueprint, url_for, flash, redirect
from views.index.index_view import auth_home
from home import app


def error_handler(app):
    # 401 error
    @app.errorhandler(401)
    def not_auth_user(error):
        return redirect(url_for('index_view.auth_home'), code=302)

    # 404 error
    @app.errorhandler(404)
    def forbidden(error):
        flash("404 :: %s" % error)
        return redirect(url_for('index_view.auth_home'), code=302)
