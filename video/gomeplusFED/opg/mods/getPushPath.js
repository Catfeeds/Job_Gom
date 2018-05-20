/**
 * 通过zTree格式数据，获取所选择的文件路径数组
 * @param path 文件数组，默认传递[]
 * @param parentPath 默认传递''
 * @param zTreeNodes zTree格式数据字符串
 * @returns {*} 返回拼接好的文件路径数组
 */
var getPushPath =  function(path, parentPath , zTreeNodes) {
    if(zTreeNodes.checked) {
        if(zTreeNodes.isParent) {
            parentPath = parentPath.concat('/' , zTreeNodes.name);
            if(zTreeNodes.children && zTreeNodes.children.length > 0) {
                for( var i in zTreeNodes.children) {
                    getPushPath(path , parentPath, zTreeNodes.children[i]);
                }
            }
        } else {
            path.push(parentPath.concat('/', zTreeNodes.name));
        }
    }
    return path;
}

module.exports = getPushPath;