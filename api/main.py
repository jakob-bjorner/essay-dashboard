from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

class RephraseRequest(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	original = db.Column(db.String(255))
	rephrased = db.Column(db.String(255))
	accepted = db.Column(db.Boolean)

	def __repr__(self):
		return '<Post %s>' % self.title

class RephraseRequestSchema(ma.Schema):
	class Meta:
		fields = ("id", "original", "rephrased", "accepted")
		model = RephraseRequest 

rephrase_request_schema = RephraseRequestSchema()
rephrase_requests_schema = RephraseRequestSchema(many=True)

class RephraseRequestListResource(Resource):
	def get(self):
		rephraseRequests = RephraseRequest.query.all()
		return rephrase_requests_schema.dump(rephraseRequests)
	
	def post(self):
		new_request = RephraseRequest(
			original=request.json['original'],
			rephrased=request.json['rephrased'],
			accepted=request.json['accepted']
		)
		db.session.add(new_request)
		db.session.commit()
		return rephrase_request_schema.dump(new_request)

class AcceptedRephraseRequestListResource(Resource):
	def get(self):
		acceptedRephraseRequests = RephraseRequest.query.filter(RephraseRequest.accepted).all()
		return rephrase_requests_schema.dump(acceptedRephraseRequests)
	
class RephraseRequestResource(Resource):
	def get(self, request_id):
		new_request = RephraseRequest.query.get_or_404(request_id)
		return rephrase_request_schema.dump(new_request)
	
	def patch(self, request_id):
		rephrase_request = RephraseRequest.query.get_or_404(request_id)

		if 'rephrased' in request.json:
			rephrase_request.rephrased = request.json['rephrased']
		if 'original' in request.json:
			rephrase_request.original = request.json['original']
		if 'accepted' in request.json:
			rephrase_request.accepted = request.json['accepted']
		
		db.session.commit()
		return rephrase_request_schema.dump(rephrase_request)
	
	def delete(self, request_id):
		rephrase_request = RephraseRequest.query.get_or_404(request_id)
		db.session.delete(rephrase_request)
		db.session.commit()
		return '', 204

api.add_resource(AcceptedRephraseRequestListResource, '/rephrase-requests/accepted')
api.add_resource(RephraseRequestListResource, '/rephrase-requests')
api.add_resource(RephraseRequestResource, '/rephrase-requests/<int:request_id>')

if __name__ == '__main__':
	app.run(debug=True)
