/**
 * 根据入口文件生成flame文件,优化生成方式
 * @param {*} options 
 */

function SaveAsJsPlugin(options){
    this.options = options || {};
}

SaveAsJsPlugin.prototype.apply = function(compiler){
    compiler.plugin('emit', (compilation, compileCallback) => {
        console.log(compilation);
        // 处理js
        let chunks = this.parseChunks(compilation.chunks);
        console.log(chunks)
        // 处理css
        // var stats = compilation.getStats().toJson();
        // console.log(stats);
        compileCallback();
    });
}

/**
 * 解析webpack处理之后的chunks,转换为正序数组
 */
SaveAsJsPlugin.prototype.parseChunks = function(chunks){
    let chunk;
    let entrys = [];
    let len = chunks.length;
    let i = len - 1;
    for(; i >= 0; i-- ){
        chunk = chunks[i];
        entrys.push(chunk.name + '.' + chunk.renderedHash + '.js');
    }
    return entrys;
}

module.exports = SaveAsJsPlugin;