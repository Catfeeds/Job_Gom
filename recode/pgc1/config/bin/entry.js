const fs = require('fs');
const path = require('path');
const paths = require('../paths');

let entrys = {
	vendor: ['jquery', 'react', 'react-dom', 'redux', 'react-router-dom'],
    app: path.resolve(paths.js, 'app.js')
};

module.exports = entrys;
