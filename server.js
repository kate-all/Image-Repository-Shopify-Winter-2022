//Kate Allsebrook
const express = require('express');
let Airtable = require('airtable');
const bodyParser = require('body-parser');
const model = require('./business-logic.js');

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
app.route("/add")
	.post((req,res) => {
		model.addImages(req.body["Images"], base)
		res.status(200)
		res.send("Thanks!")
	})

//Param Example
/*
app.route('/auth/:username/:password')
	//Sign Up
	.post((req, res) => {
	})

	//Login
	.get((req, res) => {
	})

//Query Example
app.route('/games')
	.get((req, res) => {
		res.end(JSON.stringify(model.getGames(req.query.player, req.query.active, req.query.detail)));
	})
*/

app.listen(3000);
console.log("Server listening at http://localhost:3000");