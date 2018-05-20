var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var isExtract = process.env.NODE_ENV === 'production' || process.env.NODE_ENV == 'development'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isExtract
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
