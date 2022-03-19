from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_cors import CORS
from test_openai import gpt3Rephrase

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

class RephraseLog(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	original = db.Column(db.String(255))
	rephrased = db.Column(db.String(255))
	accepted = db.Column(db.Boolean)

class RephraseRequest(db.Model):
	rephrased = db.Column(db.String(255), primary_key=True)
	original = db.Column(db.String(255))

class RephraseLogSchema(ma.Schema):
	class Meta:
		fields = ("id", "original", "rephrased", "accepted")
		model = RephraseLog

class RephraseRequestSchema(ma.Schema):
	class Meta:
		fields = ["rephrased", "original"]
		model = RephraseRequest

rephrase_log_schema = RephraseLogSchema()
rephrase_logs_schema = RephraseLogSchema(many=True)
rephrase_request_schema = RephraseRequestSchema()

class RephraseLogListResource(Resource):
	def get(self):
		RephraseLogs = RephraseLog.query.all()
		return rephrase_logs_schema.dump(RephraseLogs)

	def post(self):
		new_log = RephraseLog(
			original=request.json['original'],
			rephrased=request.json['rephrased'],
			accepted=request.json['accepted']
		)
		db.session.add(new_log)
		db.session.commit()
		return rephrase_log_schema.dump(new_log)

class AcceptedRephraseLogListResource(Resource):
	def get(self):
		acceptedRephraseLogs = RephraseLog.query.filter(RephraseLog.accepted).all()
		return rephrase_logs_schema.dump(acceptedRephraseLogs)
	
class RephraseLogResource(Resource):
	def get(self, request_id):
		new_log = RephraseLog.query.get_or_404(request_id)
		return rephrase_log_schema.dump(new_log)

	def patch(self, request_id):
		rephrase_log = RephraseLog.query.get_or_404(request_id)

		if 'rephrased' in request.json:
			rephrase_log.rephrased = request.json['rephrased']
		if 'original' in request.json:
			rephrase_log.original = request.json['original']
		if 'accepted' in request.json:
			rephrase_log.accepted = request.json['accepted']

		db.session.commit()
		return rephrase_log_schema.dump(rephrase_log)

	def delete(self, request_id):
		rephrase_log = RephraseLog.query.get_or_404(request_id)
		db.session.delete(rephrase_log)
		db.session.commit()
		return '', 204

class NewRephraseRequest(Resource):
	def post(self):
		message = request.json['message']
		a = AcceptedRephraseLogListResource()
		accepted = a.get()
		result = gpt3Rephrase(message, accepted)
		new_rephrase_request = RephraseRequest(
			original=message,
			rephrased=result
		)
		return rephrase_request_schema.dump(new_rephrase_request)

api.add_resource(NewRephraseRequest, '/rephrase')
api.add_resource(AcceptedRephraseLogListResource, '/rephrase-logs/accepted')
api.add_resource(RephraseLogListResource, '/rephrase-logs')
api.add_resource(RephraseLogResource, '/rephrase-logs/<int:request_id>')

if __name__ == '__main__':
	app.run(debug=True)
