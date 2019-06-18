def select_all_todo():
    return "select * from todo;"


def insert_todo_tuple(name, title, date_y, date_m, date_d, body, level, id):
    return "insert into todo values(" \
           "null, '%s', '%s', %d, %d, %d, " \
           "'%s', %d, '%s');" %(name, title, date_y, date_m, date_d, body, level, id)


def update_todo_tuple(title, date_y, date_m, date_d, body, level, no):
    return "update todo " \
           "set title='%s', " \
           "date_y=%d, date_m=%d, date_d=%d, " \
           "body='%s', " \
           "level=%d " \
           "where no=%d;" %(title, date_y, date_m, date_d, body, level, no)


def delete_todo_tuple(no):
    return "delete from todo where no=%d;" %(no)


def select_todo_list(id):
    return "select no, title, name, date_y, date_m, date_d, level, id " \
           "from todo where id = '%s' order by no desc;" %id


def select_todo_about_no(no):
    return "select * from todo where no=%d;" %int(no)