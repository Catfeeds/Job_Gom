var join = require('path').join;
var paths = require('./paths');

var plugin = paths.plugin;

module.exports = {
    jquery: 'jquery/dist/jquery.min.js',
    cookie: join(plugin, 'jquery.cookie'),
    unveil: join(plugin, 'jquery.unveil'), // 懒加载
    dialog: join(plugin, 'dialog', 'artDialog'),
    placeholder: join(plugin, 'jquery.placeholder'),
    spinner: join(plugin, 'jquery.spinner'),
    textchange: join(plugin, 'jquery.splendid.textchange'),
    textareaautoheight: join(plugin, 'jquery.textareaautoheight'),
    tiles: join(plugin, 'tiles'),
    io: paths.io,
    utils: join(paths.js, 'utils'),
    history: join(plugin ,'jquery.history'),
    module: paths.module,
    plugin: plugin
};
