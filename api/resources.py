from flask import request
from schemas import *
from models import *
from flask_restful import Resource
from gpt3 import gpt3Rephrase

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
	
	def get(self):
		return 'Success'