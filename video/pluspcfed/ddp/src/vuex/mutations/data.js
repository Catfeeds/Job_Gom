import Vue from 'vue';

export const ADDDB = (state, db) => {
	state.dbList = db;
};

export const ADDSCHEMA = (state, dbid, schemas) => {
	let model = state.dbList.find(x => x.id === parseInt(dbid));
	Vue.set(model, 'schemas', schemas);
};

export const ADDTABLE = (state, dbid, schemaid, tables) => {
	let db = state.dbList.find(x => x.id === parseInt(dbid));
	let model = db.schemas.find(x => x.schemaid === schemaid || x.schemaid === parseInt(schemaid));
	Vue.set(model, 'tables', tables);
};

export const ADDCOLUMN = (state, dbid, schemaid, tablename, columns) => {
	let db = state.dbList.find(x => x.id === parseInt(dbid));
	let model = db.schemas.find(x => x.schemaid === schemaid || x.schemaid === parseInt(schemaid));
	let table = model.tables.find(x => x.tablename === tablename);
	Vue.set(table, 'columns', columns);
};

export const ADDCONTENT = (state, content) => {
	state.contentList.push(content);
};

export const RESETCONTENT = (state) => {
	state.contentList = [];
	state.relateList = [];
	state.groupList = [];
	state.orderbyList = [];
};

export const SETCONTENT = (state, tablename, obj) => {
	let temp = state.contentList.find(x => x.schemaname.concat('.', x.tablename) === tablename);
	if (temp) {
		if (obj.isedit) {
			state.contentList.forEach(x => {
				if (x.isedit) {
					x.isedit = false;
				}
			});
			temp.isedit = obj.isedit;
		}
		for (let item in obj) {
			if (temp.hasOwnProperty(item)) {
				temp[item] = obj[item];
			} else {
				Vue.set(temp, item, obj[item]);
			}
		}
	}
};

export const SETCONTENTCOLUMN = (state, tablename, index, obj) => {
	let temp = state.contentList.find(x => x.schemaname.concat('.', x.tablename) === tablename);
	if (temp) {
		let column = temp.columns[index];
		for (let item in obj) {
			if (column.hasOwnProperty(item)) {
				column[item] = obj[item];
			} else {
				Vue.set(column, item, obj[item]);
			}
		}
	}
};

export const SPLICECONTENT = (state, model) => {
	// 删除model
	let index = state.contentList.indexOf(model);
	state.contentList.splice(index, 1);
	// 删除关联关系
	let tablename = model.schemaname.concat('.', model.tablename);
	let relates = state.relateList.filter(x => x.a === tablename || x.b === tablename);
	if (relates) {
		relates.forEach(x => state.relateList.splice(state.relateList.indexOf(x), 1));
	}
	// 删除分组字段
	let groups = state.groupList.filter(x => x.tableschema.concat('.', x.tablename) === tablename);
	if (groups) {
		groups.forEach(x => state.groupList.splice(state.groupList.indexOf(x), 1));
	}
};

export const ADDRELATE = (state, relate) => {
	state.relateList.push(relate);
};

export const RESETRELATE = (state) => {
	state.relateList = [];
};

export const SPLICERELATE = (state, index) => {
	state.relateList.splice(index, 1);
};

export const SETRELATECONFIG = (state, obj) => {
	state.relateConfig.show = obj.show;
};

export const SETEDITCONFIG = (state, obj) => {
	state.editConfig.show = obj.show;
};

export const SETGROUPCONFIG = (state, obj) => {
	state.groupConfig.show = obj.show;
};

export const ADDGROUP = (state, tablename) => {
	state.groupList.push(tablename);
};

export const SPLICEGROUP = (state, index) => {
	state.groupList.splice(index, 1);
};

export const ADDORDERBY = (state, tablename) => {
	state.orderbyList.push(tablename);
};

export const SPLICEORDERBY = (state, index) => {
	state.orderbyList.splice(index, 1);
};

export const ADDSQL = (state, sql) => {
	state.sqlList.push(sql);
};

export const SETSQLLIST = (state, sql) => {
	state.sqlList = sql;
};

export const SETFUNLIST = (state, funlist) => {
	state.funList = funlist;
};

export const SETEXPLIST = (state, explist) => {
	state.expList = explist;
};
