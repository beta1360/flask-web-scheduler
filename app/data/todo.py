from home import database


class Todo(database.Model):
    __tablename__ = "todo"
    no = database.Column(database.Integer, primary_key=True)
    name = database.Column(database.String(30), nullable=False)
    title = database.Column(database.String(200), nullable=False)
    date_y = database.Column(database.Integer, nullable=False)
    date_m = database.Column(database.Integer, nullable=False)
    date_d = database.Column(database.Integer, nullable=False)
    body = database.Column(database.Text, nullable=True)
    level = database.Column(database.Integer, nullable=False)
    id = database.Column(database.String(50), database.ForeignKey("user.id"), nullable=False)

    def __init__(self, id, name, title, date_y, date_m, date_d, body, level):
        self.id = id
        self.name = name
        self.title = title
        self.date_y = date_y
        self.date_m = date_m
        self.date_d = date_d
        self.body = body
        self.level = level
