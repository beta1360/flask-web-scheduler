# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database


class User(database.Model):
    __tablename__ = "user"
    id = database.Column(database.String(50), nullable=False, primary_key=True)
    password = database.Column(database.String(100), nullable=False)
    name = database.Column(database.String(30), nullable=False)
    rank = database.Column(database.String(50), nullable=False)

    def __init__(self, id, password, name, rank):
        self.id = id
        self.password = password
        self.name = name
        self.rank = rank
        self.is_authenticated = False

    def is_authenticated(self):
        return self.is_authenticated

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id
