/**
 * A top-level wrapper containing any information needed to authenticate the application/user and any component calls being made. 
 * @name Newgrounds.io.model.input 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} app_id - Your application's unique ID.
 * @property {(Newgrounds.io.model.call|Newgrounds.io.model.call[])} call - A #call object, or array of one-or-more #call objects.
 * @property {boolean} debug - If set to true, calls will be executed in debug mode.
 * @property {object} echo - An optional value that will be returned, verbatim, in the #output object.
 * @property {string} session_id - An optional login session id. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.input = function(ngio, from_object) {

	/* private vars */
	var _app_id, _call, _debug, _echo, _session_id;
	this.__property_names = ["app_id","call","debug","echo","session_id"];
	this.__classname = "Newgrounds.io.model.input";
	this.__ngio = ngio;
	
	
	var _app_id;
	Object.defineProperty(this, 'app_id', {
		get: function() { return typeof(_app_id) == 'undefined' ? null : _app_id; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'app_id', __vv__, String, null, null, null); 
			_app_id = __vv__;
		}
	});

	var _call;
	Object.defineProperty(this, 'call', {
		get: function() { return typeof(_call) == 'undefined' ? null : _call; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'call', __vv__, null, 'call', null, 'call'); 
			_call = __vv__;
		}
	});

	var _debug;
	Object.defineProperty(this, 'debug', {
		get: function() { return typeof(_debug) == 'undefined' ? null : _debug; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'debug', __vv__, Boolean, null, null, null); 
			_debug = __vv__;
		}
	});

	var _echo;
	Object.defineProperty(this, 'echo', {
		get: function() { return typeof(_echo) == 'undefined' ? null : _echo; },
		set: function(__vv__) {
			_echo = __vv__;
		}
	});

	var _session_id;
	Object.defineProperty(this, 'session_id', {
		get: function() { return typeof(_session_id) == 'undefined' ? null : _session_id; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'session_id', __vv__, String, null, null, null); 
			_session_id = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.input.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.input 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.input.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.input 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.input.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		if (this.__property_names[i] == 'call' && property) property = new Newgrounds.io.model.call(this.__ngio, property);
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.input.prototype.constructor = Newgrounds.io.model.input;