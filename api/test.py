import requests

r = requests.get('http://localhost:5000/rephrase-requests')

print(r.json()[0]['original'])