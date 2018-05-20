import Vue from 'vue';

var apis = {
	db: '/ds/db',
	schema: '/ds/schema',
	table: '/ds/table',
	column: '/ds/column'
};

Vue.http.options.crossOrigin = true;
Vue.http.options.credentials = true;
//	mysql http://10.69.10.237:8080/toy-brick/ds/db
//	mysql http://10.69.10.237:8080/toy-brick/ds/schema?&id=3
//	hive  http://10.69.10.237:8080/toy-brick/ds/schema?&id=4
//	http://10.69.10.237:8080/toy-brick/ds/table?&id=3&schemaid=gomeo2o
//	http://10.69.10.237:8080/toy-brick/ds/table?&id=4&schemaid=6
//	http://10.69.10.237:8080/toy-brick/ds/table?&id=3&schemaid=gomeo2o
//	http://10.69.10.237:8080/toy-brick/ds/table?&id=4&schemaid=6

let API_ROOT = Vue.http.options.root;
export const DbResource = Vue.resource(API_ROOT.concat(apis.db));
export const SchemaResource = Vue.resource(API_ROOT.concat(apis.schema));
export const TableResource = Vue.resource(API_ROOT.concat(apis.table));
export const ColumnResource = Vue.resource(API_ROOT.concat(apis.column));
