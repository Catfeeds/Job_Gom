import '../lib/object.js';
class Toast {
	constructor(){
		this.defaults = {
			time : 800,
			content:"",
			callback: null,
			css:null,
			type:"toast"
		}
		this.timer = null;
	}
	init(options){
		this.defaults = Object.assign(this.defaults,options);
		this.create();
	}
	create(){
		const content = this.defaults.content;
	    const toastTem = `<p class="t-txt">${content}</p>`,
			  loadTem = `<div class="t-logo"></div><p class="t-txt">${content}</p>`,
			  totastLayer = document.createElement('div');
			if(this.defaults.type === "toast"){
				totastLayer.className = "m-toast";
				totastLayer.innerHTML = toastTem;
			}
			if(this.defaults.type === "loading"){
				totastLayer.className = "m-toast-logo";
				totastLayer.innerHTML = loadTem;
			}
			this.dialog = totastLayer;
			document.body.append(totastLayer);
			document.documentElement.style.overflow = "hidden";
			this.time();
	}
	time(){
		var self = this;
		this.timer&&clearTimeout(this.timer);
		if(typeof this.defaults.time === "number"){
			this.timer = setTimeout(function(){
				document.body.removeChild(self.dialog);
				document.documentElement.style.overflow = "scroll"
				if(self.defaults.callback && typeof self.defaults.callback==="function"){
					self.defaults.callback();
				}
			},this.defaults.time)
		}
	}
}
const alert = (options) => {
    return new Toast().init(options);
}
module.exports =  alert;

