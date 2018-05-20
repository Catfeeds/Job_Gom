var paths = require('./paths'); // 路径配置

module.exports = {
    noParse: [/jquery.min/],
    preLoaders: [{
        test: /\.js$/,
        loader: "eslint",
        exclude: /(node_modules|dist|src\/js\/conf|src\/js\/plugin)/
    }],
    loaders: [{
        test: /\.tpl$/,
        include: [
          paths.page,
          paths.module,
          paths.widget,
          paths.editor
        ],
        loader: 'tmodjs'
    }, {
        test: /\.js$/,
        exclude: /(node_modules|dist|src\/js\/conf)/,
        loader: "babel"
    },{
        test: /.(jade|pug)$/,
        loader: "pug",
        query: {
          pretty:true
        }
    }]
};

