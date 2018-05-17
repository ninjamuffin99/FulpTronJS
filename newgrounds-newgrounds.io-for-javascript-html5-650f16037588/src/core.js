/* start core.js */

/**
 * Handles making calls and processing results to the Newgrounds.io server
 * @constructor
 * @memberof Newgrounds.io
 * @property {boolean} debug - Set to true to operate in debug mode
 * @property {string} app_id - Your unique app ID (found in the 'API Tools' section of your Newgrounds.com project).
 * @property {Newgrounds.io.model.user} user - A user associated with an active session id. Use getSessionLoader to load.
 * @property {string} session_id - A user session id (acquire with App.startSession call).
 * @param {string} [app_id] - Your unique app ID (found in the 'API Tools' section of your Newgrounds.com project).
 * @param {string} [aes_key] - Your AES-128 encryption key (in Base64 format).
 */
Newgrounds.io.core = function(app_id, aes_key) {

	var _app_id;
	var _session_id;
	var _user;
	var _debug;
	var ngio = this;
	var _aes_key;
	
	var _urlhelper = new Newgrounds.io.urlHelper();
	if (_urlhelper.getRequestQueryParam("ngio_session_id")) {
		_session_id = _urlhelper.getRequestQueryParam("ngio_session_id");
	}
	
	Object.defineProperty(this, 'app_id', {
		get: function() {
			return _app_id;
		}
	});
	
	Object.defineProperty(this, 'user', {
		get: function() {
			return this.getCurrentUser();
		}
	});
	
	Object.defineProperty(this, 'session_id', {
		set: function(id) {
			if (id && typeof(id) != 'string') throw new Error("'session_id' must be a string value.");
			_session_id = id ? id : null;
		},
		get: function() {
			return _session_id ? _session_id : null;
		}
	});
	
	Object.defineProperty(this, 'debug', {
		set: function(debug) {
			_debug = debug ? true:false;
		},
		get: function() {
			return _debug;
		}
	});
	
	if (!app_id) throw new Error("Missing required 'app_id' in Newgrounds.io.core constructor");
	if (typeof(app_id) != 'string') throw new Error("'app_id' must be a string value in Newgrounds.io.core constructor");
	_app_id = app_id;
	
	if (aes_key) _aes_key = CryptoJS.enc.Base64.parse(aes_key);
	else console.warn("You did not set an encryption key. Some calls may not work without this.");
	
	var _session_storage_key = "Newgrounds-io-app_session-"+(_app_id.split(":").join("-"));
	
	function checkLocalStorage() {
		if (typeof(localStorage) != 'undefined' && localStorage && localStorage.getItem.constructor == Function) return true;
		console.warn('localStorage unavailable. Are you running from a web server?');
		return false;
	}
	
	function getStoredSession() {
		if (!checkLocalStorage()) return null;
		var id = localStorage.getItem(_session_storage_key);
		return id ? id : null;
	}
	
	function setStoredSession(id) {
		if (!checkLocalStorage()) return null;
		localStorage.setItem(_session_storage_key, id);
	}
	
	function clearStoredSession() {
		if (!checkLocalStorage()) return null;
		localStorage.removeItem(_session_storage_key);
	}
	
	if (!_session_id && getStoredSession()) _session_id = getStoredSession();
	
	this.addEventListener('App.endSession', function(e) {
		ngio.session_id = null;
		clearStoredSession();
	});
	
	this.addEventListener('App.startSession', function(e) {
		if (e.success) ngio.session_id = e.data.session.id;
	});
	
	this.addEventListener('App.checkSession', function(e) {
		if (e.success) {
			if (e.data.session.expired) {
				clearStoredSession();
				this.session_id = null;
			} else if (e.data.session.remember) {
				setStoredSession(e.data.session.id);
			}
		} else {
			this.session_id = null;
			clearStoredSession();
		}
	});
	
	this._encryptCall = function(call_model) {
		if (!call_model || !call_model.constructor == Newgrounds.io.model.call_model) throw new Error("Attempted to encrypt a non 'call' object");
		var iv  = CryptoJS.lib.WordArray.random(16);
		var encrypted = CryptoJS.AES.encrypt(JSON.stringify(call_model.toObject()), _aes_key, { iv: iv });
		var output = CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
		
		call_model.secure = output;
		call_model.parameters = null;
		return call_model;
	};
}

Newgrounds.io.core.prototype = {
	
	_session_loader: null,
	_call_queue: [],
	_event_listeners: {},
	
	/**
	 * Adds a listener function to the specified event.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function addEventListener
	 * @param {string} type - The event to listen for. Typically a component name like 'Gateway.getVersion'.
	 * @param {function} listener - A function to call when the event is triggered.
	 */
	addEventListener: Newgrounds.io.events.EventDispatcher.prototype.addEventListener,
	
	/**
	 * Removes a listener function from the specified event.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function removeEventListener
	 * @param {string} type - The event you want to remove a listener from. Typically a component name like 'Gateway.getVersion'.
	 * @param {function} listener - The listener function you want to remove.
	 * @return {boolean} Returns true if a matching listener was removed.
	 */
	removeEventListener: Newgrounds.io.events.EventDispatcher.prototype.removeEventListener,
	
	/**
	 * Removes ALL listener functions from the specified event.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function removeAllEventListeners
	 * @param {string} type - The event you want to remove listeners from.
	 * @return {number} The number of listeners that were removed.
	 */
	removeAllEventListeners: Newgrounds.io.events.EventDispatcher.prototype.removeAllEventListeners,
	
	/**
	 * Dispatches an event to any listener functions.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function dispatchEvent
	 * @param {Newgrounds.io.events.OutputEvent} event - The event to dispatch.
	 * @return {boolean}
	 */
	dispatchEvent: Newgrounds.io.events.EventDispatcher.prototype.dispatchEvent,
	
	/**
	 * Gets an initialized Newgrounds.io.SessionLoader instance.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function getSessionLoader
	 * @return {Newgrounds.io.SessionLoader}
	 */
	getSessionLoader: function() {
		if (this._session_loader == null) this._session_loader = new Newgrounds.io.SessionLoader(this);
		return this._session_loader;
	},
	/**
	 * Gets the current active session, if any.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function getSession
	 * @return {Newgrounds.io.model.session}
	 */
	getSession: function() {
		return this.getSessionLoader().session;
	},
	
	/**
	 * Gets the current logged in user, if available.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function getCurrentUser
	 * @return {Newgrounds.io.model.user}
	 */
	getCurrentUser: function() {
		var sl = this.getSessionLoader();
		if (sl.session) return sl.session.user;
		return null;
	},
	
	/**
	 * Gets the last login error (if any).
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function getLoginError
	 * @return {Newgrounds.io.model.error}
	 */
	getLoginError: function() {
		return this.getSessionLoader().last_error;
	},
	
	/**
	 * Gets an active session. If one does not already exist, one will be created.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function getValidSession
	 * @param {Newgrounds.io.SessionLoader~onStatusUpdate} [callback] - An optional callback function.
	 * @param {object} [context] - The context under which to call the callback. Optional.
	 */
	getValidSession: function(callback, context) {
		this.getSessionLoader().getValidSession(callback, context);
	},
	
	/**
	 * Loads Newgrounds Passport and waits for the user to log in, or cancel their login.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function requestLogin
	 * @param {function} [on_logged_in] - A function that will execute when the user is logged in
	 * @param {function} [on_login_failed] - A function that will execute if the login fails
	 * @param {function} [on_login_cancelled] - A function that will execute if the user cancels the login.
	 * @param {object} [context] - The context under which the callbacks will be called. Optional.
	 */
	requestLogin: function(on_logged_in, on_login_failed, on_login_cancelled, context) {
		
		if (!on_logged_in || on_logged_in.constructor !== Function) throw ("Missing required callback for 'on_logged_in'.");
		if (!on_login_failed || on_login_failed.constructor !== Function) throw ("Missing required callback for 'on_login_failed'.");
		
		var io = this;
		var loader = this.getSessionLoader();
		var login_interval;
		
		function end_request() {
			if (login_interval) clearInterval(login_interval);
			io.removeEventListener("cancelLoginRequest", cancel_request);
			loader.closePassport();
		}
		
		function cancel_request() {
			on_login_cancelled && on_login_cancelled.constructor === Function ? on_login_cancelled.call(context) : on_login_failed.call(context);
			end_request();
		}
		
		io.addEventListener("cancelLoginRequest", cancel_request);
		
		if (io.getCurrentUser()) {
			on_logged_in.call(context);
		} else {
			loader.loadPassport();
			login_interval = setInterval(function(){
				loader.checkSession(function(session) {
					if (!session || session.expired) {
						if (loader.last_error.code == 111) {
							cancel_request();
						} else {
							end_request();
							on_login_failed.call(context);
						}
					} else if (session.user) {
						end_request();
						on_logged_in.call(context);
					}
				});
			}, 3000);
		}
	},
	
	/**
	 * Cancels any pending login request created via requestLogin()
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function cancelLoginRequest
	 */
	cancelLoginRequest: function() {
		event = new Newgrounds.io.events.OutputEvent("cancelLoginRequest",null,null);
		this.dispatchEvent(event);
	},
	
	/**
	 * Ends any active user session and logs the user out of Newgrounds Passport.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function logOut
	 * @param {Newgrounds.io.SessionLoader~onStatusUpdate} [callback] - An optional callback function.
	 * @param {object} [context] - The context under which to call the callback. Optional.
	 */
	logOut: function(callback, context) {
		this.getSessionLoader().endSession(callback, context);
	},
	
	/**
	 * Adds a component call to the queue. Will be executed later with executeCall.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function queueComponent
	 * @param {string} component - The component to call, ie 'Gateway.ping'
	 * @param {(object|object[])} [parameters] - Parameters being passed to the component. You may also pass multiple parameters objects in an array to execute the component multiple times.
	 * @param {Newgrounds.io.core~onCallResult} [callback] - A function that will execute when this call has executed.
	 * @param {object} [context] - The context under which the callback will be executed. Optional.
	 */
	queueComponent: function(component, parameters, callback, context) {
		if (parameters && parameters.constructor ===  Function && !callback) {
			callback = parameters;
			parameters = null;
		}
		
		var call_model = new Newgrounds.io.model.call(this);
		call_model.component = component;
		if (typeof(parameters) != 'undefined') call_model.parameters = parameters;
		this._validateCall(call_model);
		
		this._call_queue.push([call_model,callback,context]);
	},
	
	/**
	 * Executes any queued calls and resets the queue.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function executeQueue
	 */
	executeQueue: function() {
		var calls = [];
		var callbacks = [];
		var contexts = [];
		for(var i=0; i<this._call_queue.length; i++) {
			calls.push(this._call_queue[i][0]);
			callbacks.push(this._call_queue[i][1]);
			contexts.push(this._call_queue[i][2]);
		}
		
		this._doCall(calls, callbacks, contexts);
		
		this._call_queue = [];
	},
	
	/**
	 * Executes a call to a single component.
	 * @instance
	 * @memberof Newgrounds.io.core
	 * @function callComponent
	 * @param {string} component - The component to call, ie 'Gateway.ping'
	 * @param {(object|object[])} [parameters] - Parameters being passed to the component. You may also pass multiple parameters objects in an array to execute the component multiple times.
	 * @param {Newgrounds.io.core~onCallResult} [callback] - A function that will execute when this call has executed.
	 * @param {object} [context] - The context under which the callback will be executed. Optional.
	 */
	callComponent: function(component, parameters, callback, context) {
	
		if (parameters.constructor ===  Function && !callback) {
			callback = parameters;
			parameters = null;
		}
		
		var call_model = new Newgrounds.io.model.call(this);
		call_model.component = component;
		if (typeof(parameters) != 'undefined') call_model.parameters = parameters;
		
		this._validateCall(call_model);
		this._doCall(call_model, callback, context);
	},
	
	_doCallback: function(call_model, callback, o_return, context) {
		
		var i, x_return, x_callback, x_call, x_context;
		
		// generic catch-all error
		var o_error = {success:false,error:{code:0,message:"Unexpected Server Response"}};
		
		if (typeof(o_return) == 'undefined') o_return = null;
		
		// if we sent an array of calls, we'll need to check for an array of callbacks
		if (call_model.constructor ===  Array && callback && callback.constructor ===  Array) {
		
			for(i=0; i<call_model.length; i++) {
				x_return = (!o_return || typeof(o_return[i]) == 'undefined') ? o_error : o_return[i];
				x_callback = typeof(callback[i]) == 'undefined' ? null:callback[i];
				this._doCallback(call_model[i], x_callback, x_return, context[i]);
			}			
			return;
			
		}
		
		if (o_return && typeof(o_return['data']) != 'undefined') {
			var data;
			if (o_return.data.constructor === Array) {
				data = [];
				for(i=0; i<o_return.data.length; i++) {
					data.push(this._formatResults(o_return.component, o_return.data[i]))
				}
			} else {
				data = this._formatResults(o_return.component, o_return.data);
			}
			o_return.data = data;
		}
		
		var o_data;
		
		if (o_return) {
			if (typeof(o_return['data']) != 'undefined') {
				o_data = o_return.data;
			} else {
				console.warn("Received empty data from '"+call_model.component+"'.");
				o_data = null;
			}
		} else {
			o_data = o_error;
		}
		
		var event;
		if (o_data.constructor === Array) {
			for(i=0; i<o_data.length; i++) {
				event = new Newgrounds.io.events.OutputEvent(call_model.component, call_model[i], o_data[i]);
				this.dispatchEvent(event);
			}
		} else {
			event = new Newgrounds.io.events.OutputEvent(call_model.component, call_model, o_data);
			this.dispatchEvent(event);
		}
		
		// if we get here we found an actual callback function
		if (callback && callback.constructor ===  Function) {
			callback.call(context, o_data);
		}

	},
	
	_formatResults: function(component, result_object) {
		var model, i, j, models, model_name, validator = null;
		
		if (typeof(result_object.success) != 'undefined' && result_object.success) {
			validator = Newgrounds.io.call_validators.getValidator(component);
		}
		
		if (!validator) return result_object;
		
		var formats = validator.returns;
		
		for(i in formats) {
			if (typeof(result_object[i]) == 'undefined' && result_object.success !== false) {
				console.warn("Newgrounds.io server failed to return expected '"+i+"' in '"+component+"' data.");
				continue;
			}
			
			if (typeof(formats[i]['array']) != 'undefined') {
				
				if (typeof(formats[i]['array']['object']) != 'undefined') {	
					model_name = formats[i]['array']['object'];
				} else {
					model_name = formats[i]['array'];
				}
				
				if (typeof(Newgrounds.io.model[model_name]) == 'undefined') {
					console.warn("Received unsupported model '"+model_name+"' from '"+component+"'.");
					continue;
				}
				
				if (result_object[i].constructor !== Array) {
					console.warn("Expected array<"+model_name+"> value for '"+i+"' in '"+component+"' data, got "+typeof(result_object[i]));
					continue;
				}
				models = [];
				for(j=0; j<result_object[i].length; j++) {
					model = new Newgrounds.io.model[model_name](this);
					model.fromObject(result_object[i][j]);
					models.push(model);
				}
				result_object[i] = models;
				
			} else if (typeof(formats[i]['object']) != 'undefined' && result_object[i]) {
				model_name = formats[i]['object'];
				if (typeof(Newgrounds.io.model[model_name]) == 'undefined') {
					console.warn("Received unsupported model '"+model_name+"' from '"+component+"'.");
					continue;
				}
				model = new Newgrounds.io.model[model_name](this);
				model.fromObject(result_object[i]);
				result_object[i] = model;
			}
		}
		return result_object;
	},
	
	_doCall: function(call_model, callback, context) {
	
		if (!this.app_id) throw new Error('Attempted to call Newgrounds.io server without setting an app_id in Newgrounds.io.core instance.');
		
		var call_object;
		var is_redirect = false;
		var io=this;
		
		function checkRedirect(model) {
			var validator = Newgrounds.io.call_validators.getValidator(model.component);
			if (validator.hasOwnProperty('redirect') && validator.redirect) {
				var parameters = model.parameters;
				if (!parameters || !parameters.hasOwnProperty('redirect') || parameters.redirect) {
					return true;
				}
			}
			return false;
		}
		
		if (call_model.constructor === Array) {
			call_object = [];
			for(i=0; i<call_model.length; i++) {
				if (checkRedirect(call_model[i])) {
					throw new Error("Loader components can not be called in an array without a redirect=false parameter.");
				}
				call_object.push(call_model[i].toObject());
			}
		} else {
			call_object = call_model.toObject();
			is_redirect = checkRedirect(call_model);
		}
		
		var input = {
			app_id:this.app_id,
			session_id:this.session_id,
			call: call_object
		};
		
		if (this.debug) input.debug = 1;
		
		// create a temporary form and post it in a blank window to handle redirect calls
		if (is_redirect) {
			var result = {
				success: true,
				app_id: this.app_id,
				result: {
					component: call_model.component,
					data: { success: true }
				}
			};
			
			var _form = document.createElement("form");
			_form.action = Newgrounds.io.GATEWAY_URI;
			_form.target = "_blank";
			_form.method = "POST";
			
			var _form_input = document.createElement("input");
			_form_input.type="hidden";
			_form_input.name="input";
			
			_form.appendChild(_form_input);
			document.body.appendChild(_form);
			
			_form_input.value = JSON.stringify(input);
			_form.submit();
			document.body.removeChild(_form);
		
		// everything else is AJAX
		} else {
			var xhr = new XMLHttpRequest();
			var output;
			var error = null
			
			var ngio = this;
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState==4) {
					var o_return;
					try { o_return = (JSON.parse(xhr.responseText)).result; } catch(e) {}
					ngio._doCallback(call_model, callback, o_return, context);
				}
			};
			
			var formData = new FormData();
			
			// jhax is a hack to get around JS frameworks that add a toJSON method to Array (wich breaks the native implementation).
			var jhax = typeof(Array.prototype.toJSON) != 'undefined' ? Array.prototype.toJSON : null;
			if (jhax) delete Array.prototype.toJSON;
			formData.append('input', JSON.stringify(input));
			if (jhax) Array.prototype.toJSON = jhax;
			
			xhr.open('POST', Newgrounds.io.GATEWAY_URI, true);

			xhr.send(formData);
		}
	},
	
	_doValidateCall: function(component,parameters) {
		
		var i, c, param, rules;
		
		var validator = Newgrounds.io.call_validators.getValidator(component);
		if (!validator) throw new Error("'"+component+"' is not a valid server component.");
		
		if (validator.require_session && !this.session_id) throw new Error("'"+component+"' requires a session id");
		
		if (validator.import && validator.import.length > 0) {
			for(i=0; i<validator.import.length; i++) {
				c = validator.import[i].split(".");
				this._doValidateCall(c[0],c[1],parameters);
			}
		}
		
		var param_value;
		
		for(param in validator.params) {
			rules = validator.params[param];
			param_value = parameters && typeof(parameters[param]) != 'undefined' ? parameters[param] : null;
			
			if (!param_value && rules.extract_from && rules.extract_from.alias) param_value = parameters[rules.extract_from.alias];
			
			if (param_value === null) {
				if (rules.required) throw new Error("Missing required parameter for '"+component+"': "+param);
				continue;
			}
			
			if (rules.extract_from && param_value.constructor === Newgrounds.io.model[rules.extract_from.object]) {
				param_value = param_value[rules.extract_from.property];
			}
			
			if (!Newgrounds.io.model.checkStrictValue(null, param, param_value, rules.type, null, null, null)) throw new Error("Illegal value for '"+param+"' parameter of '"+component+"': "+param_value);
		}
	},
	
	_validateCall: function(call_model) {
		
		var i;
		
		if (call_model.constructor === Array) {
			var c = [];
			for(i=0; i<call_model.length; i++) {
				c.push(this._validateCall(call_model[i]));
			}
			return c;
		} else if (call_model.constructor !== Newgrounds.io.model.call) {
			throw new Error("Unexpected 'call_model' value. Expected Newgrounds.io.model.call instance.");
		}
		
		var component = call_model.component;
		var parameters = call_model.parameters;
		var echo = call_model.echo;
		
		if (parameters && parameters.constructor === Array) {
			for(i=0; i<parameters.length; i++) {
				this._doValidateCall(component, parameters[i]);
			}
		} else {
			this._doValidateCall(component, parameters);
		}
		
		var call_object = {component: call_model.component};
		var validator = Newgrounds.io.call_validators.getValidator(call_model.component);
		
		if (typeof(parameters) != 'undefined') {
			if (validator.secure) {
				var secure = this._encryptCall(call_model);
				call_object.secure = secure.secure;
			} else {
				call_object.parameters = parameters;
			}
		}
		if (typeof(echo) != 'undefined') call_object.echo = echo;
		
		return call_object;
	}
}
Newgrounds.io.core.prototype.constructor = Newgrounds.io.core;

Newgrounds.io.core.instance_id = 0;
Newgrounds.io.core.getNextInstanceID = function() {
	Newgrounds.io.core.instance_id++;
	return Newgrounds.io.core.instance_id;
};

/**
 * Callback used by Newgrounds.io.core.callComponent and Newgrounds.io.core.queueComponent
 * @callback Newgrounds.io.core~onCallResult
 * @param {object} data - The results of the call.
 */

/**
 * Used to get query string parameters from any url hosting this script (specifically to look for a session id on newgrounds hosted games)
 **/
Newgrounds.io.urlHelper = function() {
	
	var uri = window.location.href;
	var requestParams = {};
	var query = uri.split("?").pop();
	
	if (query) {
		var pairs = query.split("&");
		var key_value;
		for(var i=0; i<pairs.length; i++) {
			key_value = pairs[i].split("=");
			requestParams[key_value[0]] = key_value[1];
		}
	}
	
	/**
	 * Gets the value (if any) of a query string parameter in the current url.
	 * @instance
	 * @memberof Newgrounds.io.urlHelper
	 * @function getRequestQueryParam
	 * @param {string} param_name - The name of the query parameter you want to look up
	 * @param [default_value] - A value to return if there is no matching query parameter.
	 */
	this.getRequestQueryParam = function(param_name, default_value) {
		if (typeof(default_value) == 'undefined') default_value = null;
		return typeof(requestParams[param_name]) == 'undefined' ? default_value : requestParams[param_name];
	};
}

/* end core.js */