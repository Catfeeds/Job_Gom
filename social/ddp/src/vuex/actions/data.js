export const addDbs = (store, db) => {
	store.dispatch('ADDDB', db);
};

export const addSchemas = (store, dbid, schemas) => {
	store.dispatch('ADDSCHEMA', dbid, schemas);
};

export const addTables = (store, dbid, schemaid, tables) => {
	store.dispatch('ADDTABLE', dbid, schemaid, tables);
};

export const addColumns = (store, dbid, schemaid, tablename, columns) => {
	store.dispatch('ADDCOLUMN', dbid, schemaid, tablename, columns);
};

export const AddContent = (store, content) => {
	store.dispatch('ADDCONTENT', content);
};

export const ResetContent = (store) => {
	store.dispatch('RESETCONTENT');
};

export const SpliceContent = (store, model) => {
	store.dispatch('SPLICECONTENT', model);
};

export const SetContent = (store, tablename, obj) => {
	store.dispatch('SETCONTENT', tablename, obj);
};

export const SetContentCoulumn = (store, tablename, index, obj) => {
	store.dispatch('SETCONTENTCOLUMN', tablename, index, obj);
};

export const AddRelate = (store, relate) => {
	store.dispatch('ADDRELATE', relate);
};

export const ResetRelate = (store) => {
	store.dispatch('RESETRELATE');
};

export const SpliceRelate = (store, index) => {
	store.dispatch('SPLICERELATE', index);
};

export const SetRelateConfig = (store, obj) => {
	store.dispatch('SETRELATECONFIG', obj);
};

export const SetEditConfig = (store, obj) => {
	store.dispatch('SETEDITCONFIG', obj);
};

export const SetGroupConfig = (store, obj) => {
	store.dispatch('SETGROUPCONFIG', obj);
};

export const AddGroup = (store, tablename) => {
	store.dispatch('ADDGROUP', tablename);
};

export const SpliceGroup = (store, index) => {
	store.dispatch('SPLICEGROUP', index);
};

export const AddOrderby = (store, tablename) => {
	store.dispatch('ADDORDERBY', tablename);
};

export const SpliceOrderby = (store, index) => {
	store.dispatch('SPLICEORDERBY', index);
};

export const AddSql = (store, sql) => {
	store.dispatch('ADDSQL', sql);
};

export const SetSqlList = (store, sql) => {
	store.dispatch('SETSQLLIST', sql);
};

export const SetFunList = (store, funlist) => {
	store.dispatch('SETFUNLIST', funlist);
};

export const SetExpList = (store, explist) => {
	store.dispatch('SETEXPLIST', explist);
};
