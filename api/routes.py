from flask_restful import Api
from resources import *

api = Api()

api.add_resource(NewRephraseRequest, '/rephrase')
api.add_resource(AcceptedRephraseLogListResource, '/rephrase-logs/accepted')
api.add_resource(RephraseLogListResource, '/rephrase-logs')
api.add_resource(RephraseLogResource, '/rephrase-logs/<int:request_id>')