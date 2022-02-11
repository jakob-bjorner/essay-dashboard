from flask import Flask, jsonify

app = Flask(__name__)

somedata = [{"topic": "food", "lines": "19", "tone": "Sad", "ID": "0"},
{"topic": "history", "lines": "50", "tone": "Happy","ID": "1"},
{"topic": "sports", "lines": "30", "tone": "Angry","ID": "2"},
{"topic": "philosophy", "lines": "22", "tone": "Serious","ID": "3"}]

@app.route('/')
def index():
    return("THIS IS A THING")

@app.route('/data', methods=['GET'])
def get():
    return jsonify({'Data': somedata})

@app.route('/data/<int:ID>', methods = ['GET'])
def get_data(ID):
    return jsonify({'Data': somedata[ID]})

@app.route('/data', methods=['POST'])
def create():
    newentry = {"topic": "Hank", "lines": "50", "tone": "Propane", "ID": "4"}
    somedata.append(newentry)
    return jsonify({'created': newentry})

# this does not work as likely intended. When making some request in http, you need to 
# send one of the following: GET, POST, HEAD, PUT, DELETE. All being somewhat explanitory.
# head I just learned acts as a useless get, by just checking if a resource is responsive.
# for this one we would probably want to use the get method, but as it is in use, we would
# likely want to change the route being used to avoid conflict.
@app.route("/data/<int:ID>",  methods = ['MORE'])
def longer(ID):
    somedata[ID]["lines"] = str(int(somedata[ID]["lines"]) + 10)
    return jsonify({'Data':somedata[ID]})

@app.route("/data/<int:ID>",  methods = ['DELETE'])
def delete(ID):
    somedata.remove(somedata[ID])
    return jsonify({'result': True})

if(__name__ == "__main__"):
    app.run(debug = True)