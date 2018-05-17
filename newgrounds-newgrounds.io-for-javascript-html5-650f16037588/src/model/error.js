/**
 *  
 * @name Newgrounds.io.model.error 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {number} code - A code indication the error type.
 * @property {string} message - Contains details about the error. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.error = function(ngio, from_object) {

	/* private vars */
	var _code, _message;
	this.__property_names = ["code","message"];
	this.__classname = "Newgrounds.io.model.error";
	this.__ngio = ngio;
	
	
	var _code;
	Object.defineProperty(this, 'code', {
		get: function() { return typeof(_code) == 'undefined' ? null : _code; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'code', __vv__, Number, null, null, null); 
			_code = __vv__;
		}
	});

	var _message;
	Object.defineProperty(this, 'message', {
		get: function() { return typeof(_message) == 'undefined' ? null : _message; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'message', __vv__, String, null, null, null); 
			_message = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.error.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.error 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.error.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.error 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.error.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		this[this.__property_names[i]] = property;
	}
};

/**
 * Gets a new Newgrounds.io.model.error instance.
 * @memberof Newgrounds.io.model.error
 * @function get
 * @static
 * @param {string} [message=Unknown Error] - The error message.
 * @param {number} [code=0] - The error code.
 */
Newgrounds.io.model.error.get = function(message,code) {
	var e = new Newgrounds.io.model.error();
	e.message = message ? message : "Unknown Error";
	e.code = code ? code : 0;
	return e;
};

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.MISSING_INPUT = 100;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_INPUT = 101;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.MISSING_PARAMETER = 102;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_PARAMETER = 103;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.EXPIRED_SESSION = 104;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.DUPLICATE_SESSION = 105;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.MAX_CONNECTIONS_EXCEEDED = 106;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.MAX_CALLS_EXCEEDED = 107;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.MEMORY_EXCEEDED = 108;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.TIMED_OUT = 109;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.LOGIN_REQUIRED = 110;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_APP_ID = 200;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_ENCRYPTION = 201;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_MEDAL_ID = 202;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_SCOREBOARD_ID = 203;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.INVALID_SAVEGROUP_ID = 204;

/**
 * @constant
 * @type {number}
 */
Newgrounds.io.model.error.SERVER_UNAVAILABLE = 504;

 

Newgrounds.io.model.error.prototype.constructor = Newgrounds.io.model.error;