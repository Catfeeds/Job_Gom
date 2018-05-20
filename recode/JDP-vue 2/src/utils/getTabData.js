/*
@des:处理表格数据
*/
function getTableData(da,totleData){
      var tableData = [];
      for (var i = 0, len = da.length; i < len; i++) {
      	var tableItem = { title: '', data: [] };
        tableItem.title = da[i].name;
        tableItem.data = da[i].lists;
        tableData.push(tableItem);
        //各项数据相加得出总数的数据
     	for(var j = 0,jLen = da[i].lists.length;j < jLen; j++){
	 		totleData.data[j] += da[i].lists[j]
	 	}
      }
      tableData.push(totleData);
      return tableData
}
export default getTableData;