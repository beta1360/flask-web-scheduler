class User:
    def __init__(self, id, password, name, rank):
        self.__id = id
        self.__password = password
        self.__name = name
        self.__rank = rank
        self.authenticated = False

    @property
    def id(self):
        return self.__id

    @property
    def password(self):
        return self.__password

    @property
    def name(self):
        return self.__name

    @property
    def rank(self):
        return self.__rank

    @id.setter
    def id(self, id):
        self.__id = id

    @password.setter
    def password(self, password):
        self.__password = password

    @name.setter
    def name(self, name):
        self.__name = name

    @rank.setter
    def rank(self, rank):
        self.__rank = rank

    def is_authenticated(self):
        return self.authenticated

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.__id
