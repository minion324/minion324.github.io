from flask import Flask, render_template

app = Flask(__name__, template_folder="templates", static_folder='static', static_url_path='/')
@app.route('/')
def index():
    return render_template("timer.html")

@app.route('/flashcards')
def flashcards():
    return render_template("flashcards.html")

@app.route('/challenges')
def challenges():
    return render_template("challenges.html")

@app.route('/report')
def report():
    return render_template("report.html")

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5555, debug=True)


