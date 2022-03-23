from flask_marshmallow import Marshmallow
from models import RephraseLog, RephraseRequest

ma = Marshmallow()

class RephraseLogSchema(ma.Schema):
	class Meta:
		fields = ("id", "original", "rephrased", "accepted")
		model = RephraseLog

class RephraseRequestSchema(ma.Schema):
	class Meta:
		fields = ["rephrased", "original"]
		model = RephraseRequest