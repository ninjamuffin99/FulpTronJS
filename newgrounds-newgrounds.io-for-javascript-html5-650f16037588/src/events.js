/* start events.js */

/**
 * Contains data output by the Newgrounds.io server for use in event listeners
 * @constructor
 * @memberof Newgrounds.io.events
 * @param {string} type - The name of the event, typically the component name.
 * @param {Newgrounds.io.model.call} call - The call object that was posted to the server.
 * @param {(object|object[])} data - The results from the server.
 * @property {string} type - The name of the event, typically the component name.
 * @property {boolean} success - Will be true if the call was successful.
 * @property {Newgrounds.io.model.call} call - The call object that was posted to the server.
 * @property {(object|object[])} data - The results from the server.
 * @property {boolean} preventDefault - If set to true, event will not perform default behaviour (if any).
 */
Newgrounds.io.events.OutputEvent = function(type, call, data) {
	this.type = type;
	this.call = call;
	this.data = data;
	this.success = data && typeof(data['success'] != 'undefined') ? (data.success ? true:false) : false;
	this.preventDefault = false;
}
Newgrounds.io.events.OutputEvent.prototype.constructor = Newgrounds.io.events.OutputEvent;

/**
 * Contains data used when working with sessions
 * @constructor
 * @memberof Newgrounds.io.events
 * @param {string} type - The name of the event, typically a Newgrounds.io.events.SessionEvent constant.
 * @property {string} type - The name of the event, typically the component name.
 * @property {Newgrounds.io.model.user} user - The user associated with the session (if any).
 * @property {string} passport_url - A URL where the user can sign in securely.
 */
Newgrounds.io.events.SessionEvent = function(type) {
	this.type = type;
	this.user = null;
	this.passport_url = null;
}

/**
 * @constant
 * @type {string}
 */
Newgrounds.io.events.SessionEvent.USER_LOADED = 'user-loaded';

/**
 * @constant
 * @type {string}
 */
Newgrounds.io.events.SessionEvent.SESSION_EXPIRED = 'session-expired';

/**
 * @constant
 * @type {string}
 */
Newgrounds.io.events.SessionEvent.REQUEST_LOGIN = 'request-login';

Newgrounds.io.events.SessionEvent.prototype.constructor = Newgrounds.io.events.SessionEvent;

/**
 * Class for listening to and dispatching events.
 * @constructor
 * @memberof Newgrounds.io.events
 */
Newgrounds.io.events.EventDispatcher = function() {};
Newgrounds.io.events.EventDispatcher.prototype = {
	
	_event_listeners: {},
	
	/**
	 * Adds a listener function to the specified event.
	 * @instance
	 * @memberof Newgrounds.io.events.EventDispatcher
	 * @function addEventListener
	 * @param {string} type - The event name to listen for.
	 * @param {function} listener - A function to call when the event is triggered.
	 */
	addEventListener: function(type, listener) {
		if (type.constructor !== String) throw new Error('Event names must be a string format.');
		if (listener.constructor !== Function) throw new Error('Event listeners must be functions.');
		
		if (typeof(this._event_listeners[type]) == 'undefined') this._event_listeners[type] = [];
		this._event_listeners[type].push(listener);
	},
	
	/**
	 * Removes a listener function from the specified event.
	 * @instance
	 * @memberof Newgrounds.io.events.EventDispatcher
	 * @function removeEventListener
	 * @param {string} type - The event name you want to remove a listener from.
	 * @param {function} listener - The listener function you want to remove.
	 * @return {boolean} Returns true if a matching listener was removed.
	 */
	removeEventListener: function(type, listener) {
		if (typeof(this._event_listeners[type]) == 'undefined') return;
		var index=-1;
		for(i=0; i<this._event_listeners[type].length; i++) {
			if (this._event_listeners[type][i] === listener) {
				index = i;
				break;
			}
		}
		if (index >= 0) {
			this._event_listeners[type].splice(index,1);
			return true;
		}
		return false;
	},
	
	/**
	 * Removes ALL listener functions from the specified event.
	 * @instance
	 * @memberof Newgrounds.io.events.EventDispatcher
	 * @function removeAllEventListeners
	 * @param {string} type - The event name you want to remove listeners from.
	 * @return {number} The number of listeners that were removed.
	 */
	removeAllEventListeners: function(type) {
		if (typeof(this._event_listeners[type]) == 'undefined') return 0;
		var removed = this._event_listeners[type].length;
		this._event_listeners[type] = [];
		return removed;
	},
	
	/**
	 * Dispatches an event to any listener functions.
	 * @instance
	 * @memberof Newgrounds.io.events.EventDispatcher
	 * @function dispatchEvent
	 * @param event - The event to dispatch.
	 * @return {boolean}
	 */
	dispatchEvent: function(event) {
		var valid = false;
		var listener;
		for(var e in Newgrounds.io.events) {
			if(event.constructor === Newgrounds.io.events[e]) {
				valid = true;
				break;
			}
		}
		if (!valid) throw new Error('Unsupported event object');
		if (typeof(this._event_listeners[event.type]) == 'undefined') return false;
		for(var i=0; i<this._event_listeners[event.type].length; i++) {
			listener = this._event_listeners[event.type][i];
			if (listener(event) === false || event.preventDefault) return true;
		}
		return true;
	}
};
Newgrounds.io.events.EventDispatcher.prototype.constructor = Newgrounds.io.events.EventDispatcher;


/* end events.js */

