# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from logger import logger
import sys, json

reload(sys)
sys.setdefaultencoding("utf-8")

logger.info("====================[Initializing Server...]===============")

f = open('dbconfig.json', 'r')
db_config = json.load(f)
f.close()

app = Flask('__name__')
app.config.from_json('dbconfig.json')
app.secret_key = 'ab7a06b8ea0cb4436c8b4b4816c724db82c8c375d2a48c7ae37a2e8e3b938238'
app.config['SQLALCHEMY_DATABASE_URI'] = db_config['DBType']+'://' + db_config['DBuserID'] + ':' + db_config['DBuserPw']\
                                        + '@' + db_config['DBhost'] + '/' + db_config['DBname']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['BCRYPT_LEVEL'] = 10
database = SQLAlchemy(app)
bcrypt = Bcrypt(app)

login_manager = LoginManager()
login_manager.init_app(app)
logger.info(">> Flask, Flask-Login, Flask-SQLAlchemy setting.")
logger.info(">> Database server URL: %s" % app.config['SQLALCHEMY_DATABASE_URI'])


from db.user_handler import provide_user_instance


@login_manager.user_loader
def user_loader(user_id):
    return provide_user_instance(user_id)


from views.error.error import error_app
from views.index.index_view import index_view_app
from views.index.login import login_app
from views.index.signup import signup_app
from views.main.logout import logout_app
from views.main.main_view import main_view_app
from views.main.todolist import todolist_app
from views.main.group import group_app
from views.main.info import info_app
app.register_blueprint(error_app)
app.register_blueprint(index_view_app)
app.register_blueprint(login_app)
app.register_blueprint(signup_app)
app.register_blueprint(logout_app)
app.register_blueprint(main_view_app)
app.register_blueprint(todolist_app)
app.register_blueprint(group_app)
app.register_blueprint(info_app)


logger.info(">> Blueprint setting.")
logger.info("===========================================================")
