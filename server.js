//Kate Allsebrook

//Modules
const express = require('express');
let Airtable = require('airtable');
const bodyParser = require('body-parser');
const model = require('./business-logic.js');
const axios = require('axios');

//Express setup + middleware
let app = express();
app.use(bodyParser.raw())
app.use(bodyParser.json())

//Authenticate Airtable
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key4sTLREuAduavyp'
});
const base = Airtable.base('app1lDw2Y6fFh8UXi');

//Routes
//Add images
app.route("/add")
	.post((req,res) => {
		model.addImages(req.body["Images"], base)
		res.status(200)
		res.send("Added your image(s)!\nView the full database at https://airtable.com/invite/l?inviteId=invvjSR6mT2AQMzlZ&inviteToken=de5f719064923bbe95f24c27d8a3c917682f8f90c781b9944046b193270e90da&utm_source=email")
	})

//Get all public entries/images
app.route("/entries")
	.get((req,res) => {
		function response(output) {
			res.send(JSON.stringify(output))
			res.status(200)
		}
		model.getUploads(base,response)
	})

//Keyword search with Name field
app.route("/search")
	.get((req,res) => {
		function response(output) {
			res.send(JSON.stringify(output))
			res.status(200)
		}
		model.findByTextKey(req.query.text,base,response)
	})

//Add random plant photo
app.route("/plant") 
	.post((req,res) => {
		model.plant(axios,base)
		res.send("Planted! A random plant photo has been added to the database.\nView the full database at https://airtable.com/invite/l?inviteId=invvjSR6mT2AQMzlZ&inviteToken=de5f719064923bbe95f24c27d8a3c917682f8f90c781b9944046b193270e90da&utm_source=email")
		res.status(200)
	})

app.listen(3000);
console.log("Server listening at http://localhost:3000");