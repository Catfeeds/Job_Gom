/*
	@info
	获取table-edit-param组件树的值
	@params
	_this 当前vm
	@return
	[{
		index: 0,
		val: {
			type: '1',
			val: 'text'
		}
	}]
*/
const getParams = (_this) => {
	let arr = [];
	let forEach = (comp, index) => {
		comp.forEach(x => {
			if (x.constructor.name === 'TableEditParam') {
				arr.push({
					index: index,
					val: x.getVal()
				});
				forEach(x.$children, index + 1);
			}
		});
	};
	forEach(_this.$children, 0);
	return arr;
};

const getParamsInfo = (list) => {
	let arr = [];
	let label = '';
	let forEach = (list, index) => {
		list.forEach(x => {
			switch (x.type) {
			case '1':
				label = x.val;
				break;
			case '2':
				label = `${x.val[0].tablename}.${x.val[0].label}`;
				break;
			case '3':
				forEach(list, 0);
				break;
			}
		});
	};
};

const paramReset = (_this) => {
	let temp = _this.$children.find(x => {
		return x.constructor.name === 'TableEditParam';
	});
	temp.typeVal = ['1'];
	temp.text = '';
	temp.paramLength = 0;
};

export default {
	getParams, paramReset
};
