from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class RephraseLog(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	original = db.Column(db.String(255))
	rephrased = db.Column(db.String(255))
	accepted = db.Column(db.Boolean)

class RephraseRequest(db.Model):
	rephrased = db.Column(db.String(255), primary_key=True)
	original = db.Column(db.String(255))