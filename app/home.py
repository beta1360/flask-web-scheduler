from flask import Flask
from db.handler.user_handler import provide_user_instance
from db.dbconn import DBconn
from flask_login import LoginManager

app = Flask('__name__')
app.secret_key = 'ab7a06b8ea0cb4436c8b4b4816c724db82c8c375d2a48c7ae37a2e8e3b938238'

conn = DBconn().build()

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def user_loader(user_id):
    return provide_user_instance(conn, user_id)


from views.index.index_view import index_view_app
from views.index.login import login_app
from views.index.signup import signup_app

from views.main.logout import logout_app
from views.main.main_view import main_view_app
from views.main.todolist import todolist_app

app.register_blueprint(index_view_app)
app.register_blueprint(login_app)
app.register_blueprint(signup_app)
app.register_blueprint(logout_app)
app.register_blueprint(main_view_app)
app.register_blueprint(todolist_app)

from views.error.error import error_handler

error_handler(app)