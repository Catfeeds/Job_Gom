var paths = require('./paths'); // 路径配置

module.exports = {
    noParse: [/jquery.min/],
    /*preLoaders: [{
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /(node_modules|dist|src\/js\/conf|src\/js\/plugin)/
    }],*/
    rules: [
        {
            test: /\.tpl$/,
            include: [
              paths.page,
              paths.module,
              paths.widget,
              paths.editor
            ],
            loader: 'tmodjs-loader'
        }, {
            test: /\.js$/,
            exclude: /(node_modules|dist|src\/js\/conf)/,
            loader: "babel-loader"
        },{
            test: /.(jade|pug)$/,
            loader: "pug-loader",
            query: {
              pretty:true
            }
        }
    ]
};

