var dataForm=
{
  name : "",
  desc : "",
  did	: "",
  query : query
}

var query=
{
	type : "query",
  query : table, //table, union, cross
  alais : "t"
}

var table = 
{
	type : "table",
  ds : "hive", //data source
  schema : "ods", // database or schema
  value : "log", //table name\join\cross\query
  alais : "t", //table alais
  select : //column array. refer to select list.
  [
  ...
  ],
  
  where : logic,//logic_exp
  
  group : //similar to select list
  [
  ...
  ],
  
  having : logic, //similar to where
  
  order :
  [
  ...
  ],
  
  limit : 10,
  // 字面视图
  lview : 
  [
  {
   type : "lateralView"
   exp : func,
   alais : "t1",
   cols [
   {type:"colAlais", alais : "c1"},
   {type:"colAlais", alais : "c2"}
   ]
 },
 ...
 ],
// 聚合
 aggr :
 {
  type : "aggr", 
    value : "groupingset", //groupingset, rollup , cube
    gs : [col,...] //only used by type groupingset
  }
}

var col=
{
  type : "col",
  value : "dt",
  alias : "dt" //only used in select list
}

var array=
{
  type : "array",
  value : col,//can be string value or object
  index : 0, // optional
  alias : "dt"//only used in select list
}

var struct=
{
  type : "struct",
  value : col, //can be string value or object
  field : "name", // optional
  alias : "dt"//only used in select list
}

var map=
{
  type : "map",
  value : col,//can be string value or object
  key : "name", // optional
  alias : "dt"//only used in select list
}

var func=
{
  type : "func",
  value : "if"
  params :
  [
  ...
  ],
  alias : "dt"//only used in select list
}

var case=
{
  type : "case"
  value : col, // optional
  options :
  [
  {
   type : "caseOpt",
   when : bi_exp,
   then : 1	
 },
 ...
 ],
 else : 0
}

var ter=
{
  type : "ter",
  value : "between",
  operands :
  [
  col,"2016-08-29","2016-08-31"
  ]
}
// a=b
var bi=
{
	type : "bi",
	value : "<="
  lop : col,
  rop : "2016-08-30"
}

var un=
{
  type : "un",
  value : "is null"
  operand : col
}

var logic=
{
  type : "logic",
  value : "and",
  left : bi,
  right : logic
}

var order = 
{
  type : "order"
  value : "desc"
  exp : col	
}

var window_exp = 
{
  type : "window",
  value : func,
  over :
  {
  	type : "over",
    partition : [col,...], //same as group by
    order : [order,...], //same as order by
    rows : 
    {
    	type : "rows",
      preceding : 10, //number\unbounded\current row
      following :	"current row" //number\unbounded\current row
    }
  },
  alais : "rank"
}

var union = 
{
  type : "union",
  value : "all" //all or distinct or default
  tables : [table,...]
}

var cross = 
{
	type : "cross",
  tables : [table,join,union,...],
  alais : "ct"
}

var join=
{
  type : "join", 
  value : "left",// left, right, inner, full, left semi
  left : table,
  right : join,
  on : logic
}