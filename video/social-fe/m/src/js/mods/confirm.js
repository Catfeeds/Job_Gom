import '../lib/object.js';
class Confirm {
	constructor() {
		this.defaults = {
			title: "",
			content: "",
			cancelId: "cancelBtn",
			cancelCon: "",
			cancelCallback: null,
			sureId: "sureBtn",
			sureCon: "确定",
			sureCallback: null,
			closeCallack: null,
			time: ""
		}
	}
	init(options) {
		this.defaults = Object.assign(this.defaults, options)
		this.create();
		if (this.defaults.time) {
			this.closeTime();
		}
		this.bindEvents();
	}
	create() {
		const {
			content,
			title,
			cancelId,
			cancelCon,
			cancelCallback,
			sureId,
			sureCon,
			sureCallback
		} = this.defaults;
		const isHidden = function(val) {
			return val ? '' : 'hidden';
		}
		const confirmLayer = document.createElement("div");
		const cnacelTem = cancelCon ? `<div id="${cancelId}">${cancelCon}</div>` : "",
			tem = `<div class="dialog-tit ${isHidden(title)}">${title}</div>    
				    <div class="dialog-txt ${isHidden(content)}">${content}</div>
				    <div class="dialog-btn">${cnacelTem}<div class="${isHidden(sureCon)}" id="${sureId}">${sureCon}</div>
				    </div>`;
		confirmLayer.className = `m-dialog ${content?'m-dialog-auto':''}`;
		confirmLayer.id = "confirmLayer";
		confirmLayer.innerHTML = tem;
		if (!document.querySelector("#confirmLayer")) {
			this.dialog = confirmLayer;
			confirmLayer.style.display = "block";
			document.body.append(confirmLayer);
			document.documentElement.style.overflow = "hidden";
			this.bindEvents();
		}
	}
	bindEvents() {
		const sureBtn = document.querySelector("#" + this.defaults.sureId),
			cancelBtn = document.querySelector("#" + this.defaults.cancelId),
			self = this;
		if (sureBtn) {
			sureBtn.onclick = function() {
				self.close();
				if (self.defaults.sureCallback && typeof self.defaults.sureCallback === "function") {
					self.defaults.sureCallback();
				}
			}
		}
		if (cancelBtn) {
			cancelBtn.onclick = function() {
				self.close();
				if (self.defaults.cacelCallback && typeof self.defaults.cacelCallback === "function") {
					self.defaults.cacelCallback();
				}
			}
		}
	}
	closeTime() {
		let self = this;
		this.timer && clearTimeout(this.timer);
		if (typeof this.defaults.time === "number") {
			this.timer = setTimeout(function() {
				self.close();
				if (self.defaults.closeCallack && typeof self.defaults.closeCallack === "function") {
					self.defaults.closeCallack();
				}
			}, this.defaults.time)
		}
	}
	close() {
		document.body.removeChild(this.dialog);
		document.documentElement.style.overflow = "scroll";
	}
}
let confirm = (options) => {
    return new Confirm().init(options);
}
export default confirm;