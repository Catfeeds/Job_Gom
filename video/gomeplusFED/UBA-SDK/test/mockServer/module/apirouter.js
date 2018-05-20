const path = require('path');
const express = require('express');
let apiRouter = express.Router();

const {getDirModule} = require( './lib/fsutil');

let api=getDirModule(path.join(__dirname,'/api'));


Object.keys(api).forEach((key)=>{
	apiRouter.use(`/api/${key}`,api[key](express.Router()));
});


module.exports =  apiRouter;