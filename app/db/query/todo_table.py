def select_all_todo():
    return "select * from todo;"


def insert_todo_tuple(name, title, date_y, date_m, date_d, body, level):
    return "insert into todo values(" \
           "null, '%s', '%s', %d, %d, %d, " \
           "'%s', %d);" %(name, title, date_y, date_m, date_d, body, level)


def update_todo_tuple(title, date_y, date_m, date_d, body, level, no):
    return "update todo " \
           "set title='%s', " \
           "date_y=%d, date_m=%d, date_d=%d, " \
           "body='%s', " \
           "level=%d " \
           "where no=%d;" %(title, date_y, date_m, date_d, body, level, no)


def delete_todo_tuple(no):
    return "delete from todo where no=%d;" %(no)