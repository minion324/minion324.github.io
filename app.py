from flask import Flask, request, render_template

app = Flask(__name__, template_folder='templates')


@app.route('/')
def index():
  fighter = "Jon Johns"
  fight_card = "Despicable 3"
  return render_template('index.html', fighter=fighter, fight_card=fight_card)



@app.route('/study', methods=['GET', 'POST  '])

def hello():

  return "Hello we are here to study"


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


