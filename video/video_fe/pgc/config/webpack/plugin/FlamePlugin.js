/**
 * 根据入口文件生成flame文件,优化生成方式
 * 
 * webpack的入口配置如下:
 * 
    entry: {
        vendor: path.join(contentBase, 'src', 'js', 'vendor', 'lib.js'),
        main: path.join(contentBase, 'src', 'js', 'main.js'),
        list: path.join(contentBase, 'src', 'js', 'main.js')
    }
    vendor是依赖的第三方框架,比如:react,redux之类,
    main则是应用的入口文件,需要根据该key,生成如下的结构:
    "main": {
        css: [
            'http://www.test.com/dist/css/app.css',
        ],
        js: [
            'http://www.test.com/dist/js/runtime.js',
            'http://www.test.com/dist/js/vendor.js',
            'http://www.test.com/dist/js/page.js'
        ]
    },
    "list": {
        ...
    }
    根据此数据,生成php文件
 * @param {*} options 
 */
const path = require('path');
const klaw = require('klaw');
const fs = require('fs-extra');
const pathJoin = path.join;
const RawSource = require("webpack-sources/lib/RawSource");

class FlamePlugin{
    constructor(options){
        options = options || {};
        this.limit = options.limit || 5; // 保存历史文件的个数,默认为5个
        this.filename = options.filename || 'v-manifest.php'; // 输出的文件名
        this.outputPath = options.outputPath || process.cwd();// 文件输出目录,默认是根目录
        this.assetKeys = [];
    }

    apply(compiler){
        compiler.plugin('emit', (compilation, compileCallback) => {
            let json = this.parse(compilation);
            let php = `<?php\n\nreturn '${JSON.stringify(json, null, 4)}';`;
            compilation.assets[pathJoin(this.outputPath, this.filename)] = new RawSource(php);
            compileCallback();
        });
        compiler.plugin('after-emit', (compilation, callback) => {
            this.delHistory(compilation, callback);
        });
    }

    parse(compilation) {
        let stats = compilation.getStats().toJson();
        let assets = stats.assetsByChunkName;
        let publicPath = stats.publicPath;
    
        let keys = this.assetKeys = Object.keys(assets);
        let len = keys.length;
    
        var common = []; // 各页面依赖的公共文件
        var pages = {};  // 各页面入口文件
        for(let i = len - 1; i > -1; i--){
            let name = keys[i];
            let asset = assets[name];
            let assetPath = publicPath + '/' + asset;
            switch(name){
                case 'runtime':
                    common.unshift(assetPath);
                    break;
                case 'vendor':
                    common.push(assetPath);
                    break;
                default:
                    let page = pages[name] = {
                        js: [],
                        css: []
                    };
                    // 入口文件中若没有引用css文件
                    if(asset instanceof Array){
                        asset.forEach((file) => {
                            var ext = path.extname(file);
                            var t = 'css';
                            if('.css' === ext){
                                t = 'css';
                            } else if('.js' === ext){
                                t = 'js';
                            }
                            page[t].push(publicPath + '/' + file);
                        });
                    } else {
                        page.js.push(assetPath);
                    }
            }
        }

        // 添加runtime和vendor
        for(let name in pages){
            pages[name].js = common.concat(pages[name].js)
        }
        return pages;
    }

    /**
     * 删除历史版本,保留固定的版本数
     * 之前的做法:生成json文件记录版本,该文件中描述了所依赖的资源以及hash值等
     * 根据配置的保留文件数量,删除记录文件,然后根据记录文件中的描述信息,删除dist目录下对应的js,css文件等
     * 这种做法需要多次操作io,而且实现的版本还是同步的
     * 
     * 更新:因为dist目录下的文件都是通过webpack自动生成的
     * 根据可保留的文件数量,再根据生成时间,删除对应文件
     */
    delHistory(compilation, callback){
        let outputPath = compilation.outputOptions.path;
        let js = pathJoin(outputPath, 'js');
        let css = pathJoin(outputPath, 'css');
        this.removeAll([js, css], function(){
            callback();
        });
    }

    remove(filePath, callback){
        var assets = {};
        this.assetKeys.forEach((name) => {
            assets[name] = [];
        });
        // 过滤隐藏文件和目录
        const filterFunc = item => {
            const basename = path.basename(item);
            return basename === '.' || basename[0] !== '.'
        };
        // 遍历目录
        klaw(filePath, { filter: filterFunc }).on('data', item => {
            // 将文件按chunkname分组,然后按最后修改时间,删除不符合条件的文件
            let stats = item.stats;
            if(!stats.isDirectory()){
                let mtime = stats.mtime;
                let filePath = item.path;
                
                // path: '/webpackcli/dist/js/list.99cf70e.js -> list.99cf70e
                let ext = path.extname(filePath);
                let basename = path.basename(filePath, ext);
                let chunkKey = basename.split('-')[0];
                assets[chunkKey].push(item);
            }
        }).on('end', () => {
            let limit = this.limit;
            for(let name in assets){
                let list = assets[name];
                let len = list.length;
                if(len > limit){
                    // 按修改时间(mtime)排序
                    list.sort((a, b) => {
                        var t1 = new Date(a.stats.mtime).getTime();
                        var t2 = new Date(b.stats.mtime).getTime();
                        if(t1 - t2 > 0){
                            return 1;
                        } else if(t1 - t2 < 0){
                            return -1;
                        }
                        return 0;
                    });
                    let delPromise = list.slice(0, len - limit).map((file) => {
                        return fs.remove(file.path);
                    });

                    Promise.all(delPromise).then(values => {
                        callback();
                    }).catch(err => {
                        console.log('删除文件失败');
                    });
                } else {
                    callback();
                }
            }
        });
    }

    removeAll(arr, callback){
        let index = 0;
        let len = arr.length;
        arr.forEach((folder) => {
            this.remove(folder, () => {
                index++;
                if(index === len){
                    callback();
                }
            });
        });
    }
}

module.exports = FlamePlugin;
