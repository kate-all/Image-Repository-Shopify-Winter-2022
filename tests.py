import requests
import json

def test_entries():
    response = requests.get("http://localhost:3000/entries")
    assert response.status_code == 200
    assert type(response.json()) == list