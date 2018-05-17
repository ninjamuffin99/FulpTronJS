/* start sessionloader.js */

/**
 * Used to get a user logged in to your app
 * @constructor
 * @memberof Newgrounds.io
 * @param {Newgrounds.io.core} ngio - The Newgrounds.io.core instance being used.
 */
Newgrounds.io.SessionLoader = function(ngio) {
	if (!ngio || ngio.constructor !== Newgrounds.io.core) throw new Error("'ngio' must be a 'Newgrounds.io.core' instance.");
	this.__ngio = ngio;
	
	var _session = null;
	
	/**
	 * @property {Newgrounds.io.model.session} debug - Set to true to operate in debug mode
	 */
	Object.defineProperty(this, 'session', {
		set: function(session) {
			if (session && !session.constructor === Newgrounds.io.model.session) throw new Error("'session' must be a 'Newgrounds.io.model.session' instance.");
			_session = session;
		},
		get: function() {
			return _session;
		}
	});
}
Newgrounds.io.SessionLoader.prototype = {
	
	_event_listeners: {},
	last_error: null,
	passport_window: null,
	
	/**
	 * Adds a listener function to the specified event.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function addEventListener
	 * @param {string} type - The event to listen for.  Typically a Newgrounds.io.events.SessionEvent constant.
	 * @param {function} listener - A function to call when the event is triggered.
	 */
	addEventListener: Newgrounds.io.events.EventDispatcher.prototype.addEventListener,
	
	/**
	 * Removes a listener function from the specified event.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function removeEventListener
	 * @param {string} type - The event you want to remove a listener from. Typically a Newgrounds.io.events.SessionEvent constant.
	 * @param {function} listener - The listener function you want to remove.
	 * @return {boolean} Returns true if a matching listener was removed.
	 */
	removeEventListener: Newgrounds.io.events.EventDispatcher.prototype.removeEventListener,
	
	/**
	 * Removes ALL listener functions from the specified event.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function removeAllEventListeners
	 * @param {string} type - The event you want to remove listeners from.
	 * @return {number} The number of listeners that were removed.
	 */
	removeAllEventListeners: Newgrounds.io.events.EventDispatcher.prototype.removeAllEventListeners,
	
	/**
	 * Dispatches an event to any listener functions.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function dispatchEvent
	 * @param {Newgrounds.io.events.SessionEvent} event - The event to dispatch.
	 * @return {boolean}
	 */
	dispatchEvent: Newgrounds.io.events.EventDispatcher.prototype.dispatchEvent,
	
	/**
	 * Gets an active session. If one does not already exist, one will be created.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function getValidSession
	 * @param {Newgrounds.io.SessionLoader~onStatusUpdate} [callback] - An optional callback function.
	 * @param {object} [context] - The context under which the callback will be executed. Optional.
	 */
	getValidSession: function(callback, context) {
		var loader = this;
		loader.checkSession(function(session) {
			if (!session || session.expired) {
				loader.startSession(callback, context);
			} else {
				callback.call(context, session);
			}
		});
	},
	
	/**
	 * Starts a new Passport session.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function startSession
	 * @param {Newgrounds.io.SessionLoader~onStatusUpdate} [callback] - An optional callback function.
	 * @param {object} [context] - The context under which the callback will be executed. Optional.
	 */
	startSession: function(callback, context) {
		
		var event = new Newgrounds.io.events.SessionEvent();
		var loader = this;
		
		this.__ngio.callComponent('App.startSession', function(r) {
			if (!r.success || !r.session) {
				if (r.error) {
					loader.last_error = r.error;
				} else {
					loader.last_error = new Newgrounds.io.model.error;
					loader.last_error.message = "Unexpected Error";
				}
				event.type = Newgrounds.io.events.SessionEvent.SESSION_EXPIRED;
				loader.session = null;
			} else {
				event.type = Newgrounds.io.events.SessionEvent.REQUEST_LOGIN;
				event.passport_url = r.session.passport_url;
				loader.session = r.session;
			}
			
			loader.__ngio.session_id = loader.session ? loader.session.id : null;
			loader.dispatchEvent(event);
			if (callback && callback.constructor === Function) callback.call(context, loader.session);
		});
	},
	
	/**
	 * Loads the current session status and fires the appropriate event.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function checkSession
	 * @param {function} [callback] - An optional callback function.
	 * @param {object} [context] - The context under which the callback will be executed. Optional.
	 */
	checkSession: function(callback, context) {
		
		var event = new Newgrounds.io.events.SessionEvent();
		var loader = this;
		
		/* session has been successfully loaded already */
		if (loader.session && loader.session.user) {
			event.type = Newgrounds.io.events.SessionEvent.USER_LOADED;
			event.user = loader.session.user;
			
			loader.dispatchEvent(event);
			
			if (callback && callback.constructor === Function) callback.call(context, loader.session);
			
		/* we don't even have a session, treat it like it expired */
		} else if (!this.__ngio.session_id) {
			event.type = Newgrounds.io.events.SessionEvent.SESSION_EXPIRED;
			loader.session = null;
			loader.dispatchEvent(event);
			if (callback && callback.constructor === Function) callback.call(context, null);
			
		/* check existing session */
		} else {
			this.__ngio.callComponent('App.checkSession', function(r) {
				if (!r.success || !r.session || r.session.expired) {
					event.type = Newgrounds.io.events.SessionEvent.SESSION_EXPIRED;
					loader.session = null;
					if (r.error) {
						loader.last_error = r.error;
					} else {
						loader.last_error = new Newgrounds.io.model.error;
						if (r.session && r.session.expired) {
							loader.last_error.message = "Session is Expired";
						} else {
							loader.last_error.message = "Unexpected Error";
						}
					}
					
				} else if (!r.session.user) {
					event.type = Newgrounds.io.events.SessionEvent.REQUEST_LOGIN;
					event.passport_url = r.session.passport_url;
					loader.session = r.session;
					
				} else {
					event.type = Newgrounds.io.events.SessionEvent.USER_LOADED;
					event.user = r.session.user;
					loader.session = r.session;
				}
				
				loader.__ngio.session_id = loader.session ? loader.session.id : null;
				loader.dispatchEvent(event);
				if (callback && callback.constructor === Function) callback.call(context, loader.session);
			});
		}
	},
	
	/**
	 * Ends the current session and fires the appropriate event.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function endSession
	 * @param {function} [callback] - An optional callback function.
	 * @param {object} [context] - The context under which the callback will be executed. Optional.
	 */
	endSession: function(callback, context) {
		var loader = this;
		var ngio = this.__ngio;
		
		this.__ngio.callComponent('App.endSession', function(r) {
			loader.session = null;
			ngio.session_id = null;
			var event = new Newgrounds.io.events.SessionEvent(Newgrounds.io.events.SessionEvent.SESSION_EXPIRED);
			loader.dispatchEvent(event);
			if (callback && callback.constructor === Function) callback.call(context, loader.session);
		});
		
		this.__ngio.session_id = null;
		this.session = null;
	},
	
	/**
	 * Opens a Newgrounds Passport login page in a new browser window.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function loadPassport
	 * @param {string} [target=_blank] - The window target.
	 */
	loadPassport: function(target) {
		if(typeof(target) != 'string') target = "_blank";
		if(!this.session || !this.session.passport_url) {
			console.warn('Attempted to open Newgrounds Passport without a valid passport_url. Be sure you have called getValidSession() first!.');
			return false;
		}
		
		this.passport_window = window.open(this.session.passport_url, target);
		if (!this.passport_window) console.warn('Unable to detect passport window. Pop-up blockers will prevent loading Newgrounds Passport if loadPassport() or requestLogin() are not called from within a mouse click handler.');
		return this.passportOpen();
	},
	
	/**
	 * Closes the Newgrounds Passport window if it's still open.
	 * @instance
	 * @memberof Newgrounds.io.SessionLoader
	 * @function closePassport
	 * @return {boolean} - If true, a passport window was closed.
	 */
	closePassport: function() {
		if (!this.passport_window) return false;
		this.passport_window.close();
		return this.passportOpen();
	},
	
	/**
	 * Returns true if the passport login tab is open (must be opened from openPassport).
	 */
	passportOpen: function() {
		return this.passport_window && this.passport_window.parent ? true : false;
	}
};
Newgrounds.io.SessionLoader.prototype.constructor = Newgrounds.io.SessionLoader;


/* end sessionloader.js */