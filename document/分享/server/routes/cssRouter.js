/*
 * @Author: zhaoye 
 * @Date: 2017-07-04 17:02:36 
 * @Last Modified by: zhaoye
 * @Last Modified time: 2017-10-16 11:22:27
 */
const express = require('express')
const path = require('path')
const fs = require('fs')
const argv = require('yargs').argv
const less = require('less')
const sass = require('node-sass')
const doPostCSSWork = require('../../lib/postcssWork.js')

module.exports = function(router) {
    router.get('*.css|*.css.map', (req, res, next) => {
        let filename
        let filenameSass
        filename = path.resolve(__dirname, '../../src', req.path.replace(/^\//, '').replace('.css', '.less'))
        filenameSass = path.resolve(__dirname, '../../src', req.path.replace(/^\//, '').replace('.css', '.scss'))
        if (req.url.match(/node_modules/)) {
            filename = path.resolve(__dirname, '../../', req.path.replace(/^(.*)node_modules/, 'node_modules'))
            filenameSass = path.resolve(__dirname, '../../', req.path.replace(/^(.*)node_modules/, 'node_modules'))
        }
        if (fs.existsSync(filename)) {
            fs.readFile(filename, (err, chunk) => {
                const content = String(chunk)
                // lint
                // const result = lesshint.checkString(content, filename)
                // less
                const options = {
                    filename,
                    // sourceMap: {
                    //     sourceMapRootpath: 'debug:///',
                    //     sourceMapFileInline: true
                    // },
                    plugins: require('../../lib/lessPlugins.js'),
                }
                less.render(content, options)
                    .then((result) => {
                        return doPostCSSWork(result.css, filename)
                    })
                    .then((result) => {
                        res.append('Content-Type', 'text/css')
                        res.send(result.css)
                    })
                    .catch((err) => {
                        // res.end(err.message)
                        next(err)
                        // throw new Error(err)
                    })
            })
        } else if (fs.existsSync(filenameSass)) {
            sass.render({
                file: filenameSass,
                importer (url, prev, done) {
                    if (url.match(/^~/)) {
                        url = path.resolve(__dirname, '../../node_modules', url.replace(/^~/, ''))
                    }
                    done({
                        file: url
                        ,
                    })
                },
            }, function(err, result) {
                if (err) {
                    next(err)
                    return
                }
                doPostCSSWork(result.css, filenameSass)
                    .then((result) => {
                        res.append('Content-Type', 'text/css')
                        res.send(result.css)
                    })
            })
        } else {
            next()
        }
    })
}

