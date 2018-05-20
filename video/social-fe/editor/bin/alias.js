var paths = require('./paths');
var join = require('path').join;
var plugin = paths.plugin;

module.exports = {
    jquery: 'jquery/dist/jquery.js',
    cookie: join(plugin, 'jquery.cookie'),
    unveil: join(plugin, 'jquery.unveil'),
    dialog: join(plugin, 'dialog', 'artDialog'),
    placeholder: join(plugin, 'jquery.placeholder'),
    spinner: join(plugin, 'jquery.spinner'),
    textchange: join(plugin, 'jquery.splendid.textchange'),
    textareaautoheight: join(plugin, 'jquery.textareaautoheight'),
    imgzoom: join(plugin, 'jquery.imgzoom'),
    tiles: join(plugin, 'tiles'),
    lazyload: join(plugin, 'jquery.lazyload.js'),
    io: paths.io,
    utils: join(paths.js, 'utils'),
    history: join(plugin, 'jquery.history'),
    module: paths.module,
    shim: paths.shim,
    plugin: plugin,
    editor: paths.editor,
    page: join(paths.js, 'page'),
    js: paths.js,
    sass: paths.sass,
    scss: paths.scss
};
