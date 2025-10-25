from flask import Flask, request, render_template

app = Flask(__name__, template_folder='templates')


@app.route('/')
def index():
    fighter = "Jon Johns"
    fight_card = "Despicable 3"
    fight_task = ["New gloves", "Jump Rope", "Eat cake", "Get rich" ]
    return render_template('index.html', fighter=fighter, fight_card=fight_card, fight_task=fight_task)

@app.route('/timer', methods=['GET', 'POST  '])
def timer():
    return render_template('timer.html')





"""
stuff like <name> and <...> are url processors
"""
# @app.route('/show/<name>')
# def showName(name):
#   return f"Hi {name}"


# @app.route('/show')
# def showUser():
#   greeting = request.args.get('greeting')
#   name = request.args.get('name')
#   return f"Hi {name} you chose number {greeting}"



if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5555, debug=True)


