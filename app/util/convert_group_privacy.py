def group_private_converter(privacy):
    if privacy == "public":
        return 0
    else:  # progress == "private":
        return 1


def group_private_deconverter(privacy_code):
    if privacy_code == 0:
        return "public"
    else:  # privacy_code == 1:
        return "private"
