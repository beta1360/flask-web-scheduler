class Todo:
    def __init__(self, id, name, title, date_y, date_m, date_d, body, level):
        self.__id = id
        self.__name = name
        self.__title = title
        self.__date_y = date_y
        self.__date_m = date_m
        self.__date_d = date_d
        self.__body = body
        self.__level = level

    @property
    def id(self):
        return self.__id

    @property
    def name(self):
        return self.__name

    @property
    def title(self):
        return self.__title

    @property
    def date_y(self):
        return self.__date_d

    @property
    def date_m(self):
        return self.__date_m

    @property
    def date_d(self):
        return self.__date_d

    @property
    def body(self):
        return self.__body

    @property
    def level(self):
        return self.__level

    @id.setter
    def id(self, id):
        self.__id = id

    @name.setter
    def name(self, name):
        self.__name = name

    @title.setter
    def title(self, title):
        self.__title = title

    @date_y.setter
    def date_y(self, date_y):
        self.__date_y = date_y

    @date_m.setter
    def date_m(self,date_m):
        self.__date_m = date_m

    @date_d.setter
    def date_d(self, date_d):
        self.__date_d = date_d

    @body.setter
    def body(self, body):
        self.__body = body

    @level.setter
    def level(self, level):
        self.__level = level