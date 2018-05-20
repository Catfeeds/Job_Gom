const join = require('path').join;

const contentBase = process.cwd();
const dist = join(contentBase, 'dist');
const src = join(contentBase, 'src');
const js = join(src, 'js');
const css = join(src, 'css');
const scss = join(src, 'scss');
const fonts = join(src, 'fonts');

const map = {
    contentBase,
    src,
    js,
    css,
    scss,
    fonts,
    dist,
};

const dirs = ['page', /* 'io', 'plugin', 'common', 'components', */ 'util', 'vendor'];
dirs.forEach((dir) => {
    map[dir] = join(js, dir);
});

module.exports = map;
