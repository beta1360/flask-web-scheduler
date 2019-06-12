def select_all_user():
    return "select * from user;"


def insert_user_tuple(id, pw, name, rank):
    return "insert into user values(" \
           "'%s', HEX(AES_ENCRYPT('%s', MD5('test'))), " \
           "'%s', '%s');" %(id, pw, name, rank)


def update_user_tuple(pw, name, rank, id):
    return "update user " \
           "set password=HEX(AES_ENCRYPT('%s', MD5('test'))), name = '%s', rank='%s' " \
           "where id='%s';" %(pw, name, rank, id)


def delete_user_tuple(id):
    return "delete from user where id='%s';" %(id)


def select_registed_user(id):
    return "select id from user where id='%s';" %(id)