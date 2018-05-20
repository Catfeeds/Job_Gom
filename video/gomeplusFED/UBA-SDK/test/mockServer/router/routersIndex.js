
var express = require('express');
var router = express.Router();
var {apiRouter} = require('../module');

//simple view
(function(...paths){
	paths.forEach((path)=>{
		require(path)(router);
	});
})('./index');

module.exports=[apiRouter,router];