from home import conn, app

try:
    app.run('0.0.0.0', 13609, debug=True)

finally:
    conn.close()
