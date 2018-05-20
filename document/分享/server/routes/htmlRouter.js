/*
 * @Author: zhaoye 
 * @Date: 2017-07-03 17:28:56 
 * @Last Modified by: zhaoye
 * @Last Modified time: 2017-10-16 11:29:41
 */
const app = require('../app.js')
const path = require('path')
const fs = require('fs')
const argv = require('yargs').argv
const ejs = require('ejs')
const pug = require('pug')

module.exports = function(router) {
    router.get('/*', (req, res, next) => {
        const filename = path.resolve(__dirname, path.join('../../src/views', req.path)).replace(/\.html$/, '.ejs')
        const filenamePug = path.resolve(__dirname, path.join('../../src/views', req.path)).replace(/\.html$/, '.pug')
        if (fs.existsSync(filename)) {
            const tmpl = String(fs.readFileSync(filename))
            const result = tmpl.replace(/\{JS_CDN_IP\}/g, '/js')
                .replace(/\{CSS_CDN_IP\}/g, '/style')
                .replace(/{PLUS_GOMEUI_CDN_IP}/g, '/node_modules/plus-public')
                .replace(/\{PLUS_CSS\}/g, '/')
                .replace(/\{PLUS_JS\}/g, '/')
                .replace(/\{APP_CDN_IP\}/g, '/images')
                .replace(/\{GOMEUI_CDN_IP\}/g, '/gomeUI')
            res.end(ejs.render(result, {
                filename,
            }))
        } else if (fs.existsSync(filenamePug)) {
            const tmpl = String(fs.readFileSync(filenamePug))
            const result = tmpl.replace(/\{JS_CDN_IP\}/g, '/js')
                .replace(/\{CSS_CDN_IP\}/g, '/style')
                .replace(/{PLUS_GOMEUI_CDN_IP}/g, '/node_modules/plus-public')
                .replace(/\{PLUS_CSS\}/g, '/')
                .replace(/\{PLUS_JS\}/g, '/')
                .replace(/\{APP_CDN_IP\}/g, '/images')
                .replace(/\{GOMEUI_CDN_IP\}/g, '/gomeUI')
            res.end(pug.render(result, {
                filename,
            }))
        } else if (req.path.match(/\.html$/)) {
            res.render(req.path.replace(/^\//, ''))
        } else {
            next()
        }
    })
}

