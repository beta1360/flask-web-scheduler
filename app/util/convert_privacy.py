def privacy_converter(privacy):
    if privacy == "public":
        return 0
    else:  # progress == "private":
        return 1


def privacy_deconverter(privacy_code):
    if privacy_code == 0:
        return "public"
    else:  # privacy_code == 1:
        return "private"
