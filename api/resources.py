from flask import request
from schemas import *
from models import *
from flask_restful import Resource
from gpt3 import gpt3Rephrase, gpt3SentenceCompletion

rephrase_log_schema = RephraseLogSchema()
rephrase_logs_schema = RephraseLogSchema(many=True)
rephrase_request_schema = RephraseRequestSchema()
sentence_completion_log_schema = SentenceCompletionLogSchema()
sentence_completion_logs_schema = SentenceCompletionLogSchema(many=True)
sentence_completion_schema = SentenceCompletionRequestSchema()

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

class SentenceCompletionLogListResource(Resource):
	def get(self):
		Sentence_Completion_Logs = Sentence_Completion_Log.query.all()
		return sentence_completion_logs_schema.dump(Sentence_Completion_Logs)

	def post(self):
		new_log = Sentence_Completion_Log(
			original=request.json['original'],
			rephrased=request.json['rephrased'],
			accepted=request.json['accepted']
		)
		db.session.add(new_log)
		db.session.commit()
		return sentence_completion_log_schema.dump(new_log)

class AcceptedRephraseLogListResource(Resource):
	def get(self):
		acceptedRephraseLogs = RephraseLog.query.filter(RephraseLog.accepted).all()
		return rephrase_logs_schema.dump(acceptedRephraseLogs)
	
class AcceptedSentenceCompletionLogListResource(Resource):
	def get(self):
		acceptedSentenceCompletionLogs = SentenceCompletionLog.query.filter(SentenceCompletionLog.accepted).all()
		return sentence_completion_logs_schema.dump(acceptedSentenceCompletionLogs)

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

class SentenceCompletionLogResource(Resource):
	def get(self, request_id):
		new_log = SentenceCompletionLog.query.get_or_404(request_id)
		return sentence_completion_log_schema.dump(new_log)

	def patch(self, request_id):
		sentence_completion_log = SentenceCompletionLog.query.get_or_404(request_id)

		if 'rephrased' in request.json:
			rephrase_log.rephrased = request.json['rephrased']
		if 'original' in request.json:
			rephrase_log.original = request.json['original']
		if 'accepted' in request.json:
			rephrase_log.accepted = request.json['accepted']

		db.session.commit()
		return sentence_completion_log_schema.dump(rephrase_log)

	def delete(self, request_id):
		sentence_completion_log = SentenceCompletionLog.query.get_or_404(request_id)
		db.session.delete(sentence_completion_log)
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
		
class NewSentenceCompletionRequest(Resource):
	def post(self):
		message = request.json['message']
		a = AcceptedSentenceCompletionLogListResource()
		accepted = a.get()
		result = gpt3SentenceCompletion(message, accepted)
		new_sentence_completion_request = SentenceCompletion(
			original=message,
			rephrased=result
		)
		return sentence_completion_schema.dump(new_sentence_completion_request)

	
	def get(self):
		return 'Success'
