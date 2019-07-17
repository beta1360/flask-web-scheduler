def progress_converter(progress):
    if progress == "TODO":
        return 0
    elif progress == "DOING":
        return 1
    else:
        return 2


def progress_deconverter(progress_code):
    if progress_code == 0:
        return "TODO"
    elif progress_code == 1:
        return "DOING"
    else:
        return "DONE"
