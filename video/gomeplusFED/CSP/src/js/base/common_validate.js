/**
 * Created by zhangmike on 16/6/15.
 */
var Validate = {
	types : {},
	result:[],
	validate : function(data) {
		this.result = []
		for (var i in data){
			if (data.hasOwnProperty(i)){
				var funName = this.types[i]
				if (!funName){
					throw {
						name:"ValidationError",
						message:"No handler to Validate type " + funName
					}
				}
				var ret = funName.validate(data[i]);
				if (!ret){
					this.result.push(funName.instructions)
				}
			}
		}
		return this
	},
	errors: function(){
		return this.result.length !== 0
	}
}

Validate.types.isRealNode = {
	validate: function(data) {
		if (data < 0) {
			return false
		}else {
			return true
		}
	},
	instructions:"isRealNode"
}

Validate.types.isNotThirdLevel = {
	validate: function(data) {
		if (data !== 3) {
			return true
		}else {
			return false
		}
	},
	instructions:"isNotThirdLevel"
}

Validate.types.isTrue = {
	validate: function(data) {
		if (data === true) {
			return true
		}else {
			return false
		}
	},
	instructions:"isTrue"
}

export {Validate}