# -*- coding: utf-8 -*-
"""
 url: https://github.com/KeonHeeLee/flask-web-scheduler
 email: beta1360@naver.com
"""

from home import database


class Groups(database.Model):
    __tablename__ = "groups"
    group_num = database.Column(database.Integer, nullable=False, primary_key=True)
    group_name = database.Column(database.String(30), nullable=False)
    group_code = database.Column(database.String(30), nullable=False)
    privacy = database.Column(database.Integer, nullable=False)

    def __init__(self, group_num, group_name, group_code, privacy):
        self.group_num = group_num
        self.group_name = group_name
        self.group_code = group_code
        self.privacy = privacy
