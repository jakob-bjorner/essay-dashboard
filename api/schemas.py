from flask_marshmallow import Marshmallow
from models import *

ma = Marshmallow()

class RephraseLogSchema(ma.Schema):
	class Meta:
		fields = ("id", "original", "rephrased", "accepted")
		model = RephraseLog

class RephraseRequestSchema(ma.Schema):
	class Meta:
		fields = ["rephrased", "original"]
		model = RephraseRequest

class SentenceCompletionLogSchema(ma.Schema): #Change 4
	class Meta:
		fields = ("id", "original", "rephrased", "accepted")
		model = SentenceCompletionLog

class SentenceCompletionRequestSchema(ma.Schema):
	class Meta:
		fields = ["rephrased", "original"]
		model = SentenceCompletion

class EssayOutlineLogSchema(ma.Schema): #Change 4
	class Meta:
		fields = ("id", "original", "rephrased", "accepted")
		model = EssayOutlineLog

class EssayOutlineRequestSchema(ma.Schema):
	class Meta:
		fields = ["rephrased", "original"]
		model = EssayOutline