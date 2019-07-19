# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database


class Groups(database.Model):
    __tablename__ = "groups"
    group_num = database.Column(database.Integer, primary_key=True)
    group_name = database.Column(database.String(30), nullable=False)

    def __init__(self, group_num, group_name):
        self.group_num = group_num
        self.group_name = group_name
