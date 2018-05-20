/**
 * [bind event]
 * @param  {[type]}   element [ele]
 * @param  {[type]}   event   [event name]
 * @param  {Function} cb      [callback func]
 * @param  {[type]}   capture [capture]
 * @example bind(ele, 'click', () => { ... })
 */
export const bind = (element, event, cb, capture) => {
	!element.addEventListener && (event = 'on' + event);
	(element.addEventListener || element.attachEvent).call(element, event, cb, capture);
	return cb;
};

/**
 * [unbind event]
 * @param  {[type]}   element [ele]
 * @param  {[type]}   event   [event name]
 * @param  {Function} cb      [callback]
 * @param  {[type]}   capture [capture]
 * @example unbind(ele, 'click', () => { ... })
 */
export const unbind = (element, event, cb, capture) => {
	!element.removeEventListener && (event = 'on' + event);
	(element.removeEventListener || element.detachEvent).call(element, event, cb, capture);
	return cb;
};

/**
 * [trigger element event]
 * @param  {[type]} node      [element]
 * @param  {[type]} eventName [event]
 * @example trigger(ele, 'click')
 */
export const trigger = (node, eventName) => {
	var doc;
	if (node.ownerDocument) {
		doc = node.ownerDocument;
	} else if (node.nodeType === 9) {
		doc = node;
	} else {
		throw new Error('Invalid node passed to fireEvent: ' + node.id);
	}

	if (node.dispatchEvent) {
		let eventClass = '';
		let mouseEventArr = ['click', 'mousedown', 'mouseup'];
		let htmlEventArr = ['focus', 'change', 'blur', 'select'];
		if (mouseEventArr.includes(eventName)) {
			eventClass = "MouseEvents";
		} else if (htmlEventArr.includes(eventName)) {
			eventClass = "HTMLEvents";
		} else {
			throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
		}

		let event = doc.createEvent(eventClass);
		event.initEvent(eventName, true, true);
		event.synthetic = true;
		node.dispatchEvent(event, true);
	} else if (node.fireEvent) {
		let event = doc.createEventObject();
		event.synthetic = true;
		node.fireEvent('on' + eventName, event);
	}
};
