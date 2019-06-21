from home import database, bcrypt
from data.user import User


def add_user(req):
    user = User(req["id"], bcrypt.generate_password_hash(req["password"]), req["name"], req["rank"])
    if not is_registed_user(user.id):
        database.session.add(user)
        database.session.commit()
        return True

    else:
        return False


def modify_user(id, req):
    user = User.query.filter_by(id=id).first()

    if req["password"] != '':
        user.password = req["password"]

    if req["name"] != '':
        user.name = req["name"]

    if req["rank"] != '':
        user.rank = req["rank"]

    database.session.commit()


def delete_user(id):
    User.query.filter_by(id=id).delete()
    database.session.commit()


def is_registed_user(id):
    user = User.query.filter_by(id=id).first()
    return user is not None if True else False


def get_login_user(id, pw):
    user = User.query.filter_by(id=id).first()

    if user is not None:
        if bcrypt.check_password_hash(user.password, pw):
            return user
        else:
            return None
    else:
        return None


def provide_user_instance(id):
    return User.query.filter_by(id=id).first()
