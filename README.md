# Welcome to my Plant Image Repository!
Hello! If you're reading this, you are looking at my Shopify internship application, in which case I will start by saying thank you! I hope your recruiting is going well!

I've created an API that is connected to an Airtable database to add images of plants! Each entry has a name, image url, and can be set to private or public. API routes are listed in more detail in the **Using the API** section.

## Setting Up
- Install [Node.js](https://nodejs.org/en/download/)
- Download/clone this repo
- (Optional) Download [Postman](https://www.postman.com/downloads/) \*
  
\* Any tool that can send requests to an API works

## Running it
1. Navigate to the repo folder via the command line
2. Run the following command: `node server`
3. A message saying "Server listening at http://localhost:3000" should appear
Now the server is up and running on port 3000!

## Automated Testing
I made a python file of unit tests if you want to quickly test that everything works.
To use:

1. Download [Python](https://www.python.org/downloads/)
2. Open another terminal and navigate to the repo folder
3. Run `python tests.py`(Windows) or `python3 tests.py` (Linux or MacOS)

## Using the API

### Adding Images
`POST http://localhost:3000/add` 

Request body format:
```
{
       "Images": [
               {  
                     "name": "Thyme",
                     "url": "https://www.gardeningknowhow.com/wp-content/uploads/2020/11/potted-thyme-plant.jpg",
                     "privacy": "private"
               }
            ]
}
```
The array can have as many images as you'd like!

### Get All Public Entries
`GET http://localhost:3000/entries`

Response format:
```
[{"name":"Aloe",
"Image":"https://dl.airtable.com/.attachmentseaa39e7d77723af6d29acf451ac2026b/b94be48faloe-vera-white-pot_sunwand24-ss_edit.jpg",
"Privacy":"public"},
{"name":"Looking up",
"Image":"https://dl.airtable.com/.attachments796fbfe723ff64beb196af3c5dffa564/e46a7da1photo-1513836279014-a89f7a76ae86",
"Privacy":"public"},
...]
```

### Keyword Search
`GET http://localhost:3000/search?text=<Keyword>`

Returns a list/array of all public image objects with the keyword in its name.

NOTE: This is a case sensitive search.

Sample Request:
```
GET [http](http://localhost:3000/search?text=Coffee`)
```

Response Format:
```
[{"name":"Coffee plant",
"Image":"https://dl.airtable.com/.attachments4417e4a618535331e1e25021f2ac3181/f1287f02/Coffee-Plant-.jpg",
"Privacy":"public"}]
```

### Add a Random Plant Photo
`POST http://localhost:3000/plant`
All random photos have public visibility

## View the Database
View the full database [HERE](https://airtable.com/invite/l?inviteId=invvjSR6mT2AQMzlZ&inviteToken=de5f719064923bbe95f24c27d8a3c917682f8f90c781b9944046b193270e90da&utm_source=email)

## Technologies Used
- [Airtable API](https://airtable.com/api) - Client Library
- [Unsplash API](https://unsplash.com/developers)
- Node.js
- Python

Thank you and I hope you enjoy working with my project!

