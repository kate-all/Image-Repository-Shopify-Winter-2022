import requests

def test_add_single():
    req = {"Images": [{
        "name": "Cactus",
        "url": "https://images.unsplash.com/photo-1554631221-f9603e6808be?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FjdHVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        "privacy": "private"
    }]}
    response = requests.post('http://localhost:3000/add', json = req)
    assert response.status_code == 200
    assert response.text == "Added your image(s)!\nView the full database at https://airtable.com/invite/l?inviteId=invvjSR6mT2AQMzlZ&inviteToken=de5f719064923bbe95f24c27d8a3c917682f8f90c781b9944046b193270e90da&utm_source=email"

def test_entries():
    response = requests.get("http://localhost:3000/entries")
    assert response.status_code == 200
    assert type(response.json()) == list

def test_search():
    response = requests.get("http://localhost:3000/search?text=Coffee")
    assert response.status_code == 200
    assert type(response.json()) == list
    assert response.json()[0]["Name"] == "Coffee plant"

def test_random():
    response = requests.post("http://localhost:3000/plant")
    assert response.status_code == 200
    assert response.text == "Planted! A random plant photo has been added to the database.\nView the full database at https://airtable.com/invite/l?inviteId=invvjSR6mT2AQMzlZ&inviteToken=de5f719064923bbe95f24c27d8a3c917682f8f90c781b9944046b193270e90da&utm_source=email"