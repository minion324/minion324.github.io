from flask import Flask, render_template, request, jsonify
import json

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
    # return render_template("report.html")
    return "Yes"


# javascript is requesting to flask to process ... and the flask is processing that request
# and returns that response to javascript
@app.route('/exportCard', methods=["POST"])
def exportCard():
    if request.method == "POST":
        # Reads the request body from the frontend (which is a JSON string)
        # Parses that JSON string into a Python data structure
        # Returns a Python dict (or list, depending on the JSON)
        data = request.get_json()
        json_string = json.dumps(data)
        # file_path = "/home/minion/Documents/flashcard.json"
        file_path = "flashcard.json"
        with open(file_path, 'w') as file:
            file.write(json_string)
        print("Received Data:", data)
        # Jsonify is turning a python object into a JSON format
        return jsonify({"status": "success"})
    return None


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5555, debug=True)


