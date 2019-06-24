def build(code_num, code_message):
    return {
        "code": code_num,
        "message": code_message
    }


def success_to_login(name):
    return "Hello, %s!"%name
