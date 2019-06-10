from flask import Flask, render_template

app = Flask('__name__')

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html"), 200

if __name__ == '__main__':
    app.run('0.0.0.0', 8000, debug=True)
