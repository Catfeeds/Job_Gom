import { DbResource, SchemaResource, TableResource, ColumnResource } from './resource';

export default {
	getDbs() {
		return DbResource.get();
	},
	getSchemas(id) {
		return SchemaResource.get({ id: id });
	},
	getTables(id, schemaid) {
		return TableResource.get({ id: id, schemaid: schemaid });
	},
	getColumns(id, schemaid, tablename) {
		return ColumnResource.get({ id: id, schemaid: schemaid, tablename: tablename });
	}
};
