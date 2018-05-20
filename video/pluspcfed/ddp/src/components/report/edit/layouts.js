const layouts = [{
	name: '布局1',
	id: 1,
	position: [{
		id: 1,
		width: '50%',
		height: '40%',
		col: 6,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}, {
		id: 1,
		width: '50%',
		height: '40%',
		col: 6,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}, {
		id: 1,
		width: '100%',
		height: '20%',
		col: 12,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}, {
		id: 1,
		width: '100%',
		height: '40%',
		col: 12,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}]
}, {
	name: '布局2',
	id: 2,
	position: [{
		id: 1,
		width: '100%',
		height: '30%',
		col: 12,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}, {
		id: 2,
		width: '100%',
		height: '30%',
		col: 12,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}, {
		id: 3,
		width: '100%',
		height: '40%',
		col: 12,
		dragenter: false,
		compName: '',
		component: null,
		ref: []
	}]
}, {
	name: '布局3',
	id: 3,
	position: [{
		id: 1,
		width: '100%',
		height: '100%'
	}]
}];

layouts.forEach(layout => {
	layout.position.forEach(pos => {
		pos.dragenter = false;
		pos.compName = '';
		pos.component = null;
		pos.ref = [];
		pos.componentreply = {
			radio: '',
			checkBox: [],
			datePicker: []
		};
	});
});

export {
	layouts
};
