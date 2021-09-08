//Kate Allsebrook

const express = require('express');
//const model = require('./business-logic.js');

//Express setup
let app = express();

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