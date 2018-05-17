/**
 * Contains all return output from an API request. 
 * @name Newgrounds.io.model.output 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} api_version - If there was an error, this will contain the current version number of the API gateway.
 * @property {string} app_id - Your application's unique ID
 * @property {Newgrounds.io.model.debug} debug - Contains extra information you may need when debugging (debug mode only).
 * @property {object} echo - If you passed an 'echo' value in your input object, it will be echoed here.
 * @property {Newgrounds.io.model.error} error - This will contain any error info if the success property is false.
 * @property {string} help_url - If there was an error, this will contain the URL for our help docs.
 * @property {(Newgrounds.io.model.result|Newgrounds.io.model.result[])} result - This will be a #result object, or an array containing one-or-more #result objects (this will match the structure of the #call property in your #input object).
 * @property {boolean} success - If false, there was a problem with your 'input' object. Details will be in the #error property. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.output = function(ngio, from_object) {

	/* private vars */
	var _api_version, _app_id, _debug, _echo, _error, _help_url, _result, _success;
	this.__property_names = ["api_version","app_id","debug","echo","error","help_url","result","success"];
	this.__classname = "Newgrounds.io.model.output";
	this.__ngio = ngio;
	
	
	var _api_version;
	Object.defineProperty(this, 'api_version', {
		get: function() { return typeof(_api_version) == 'undefined' ? null : _api_version; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'api_version', __vv__, String, null, null, null); 
			_api_version = __vv__;
		}
	});

	var _app_id;
	Object.defineProperty(this, 'app_id', {
		get: function() { return typeof(_app_id) == 'undefined' ? null : _app_id; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'app_id', __vv__, String, null, null, null); 
			_app_id = __vv__;
		}
	});

	var _debug;
	Object.defineProperty(this, 'debug', {
		get: function() { return typeof(_debug) == 'undefined' ? null : _debug; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'debug', __vv__, null, 'debug', null, null); 
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

	var _error;
	Object.defineProperty(this, 'error', {
		get: function() { return typeof(_error) == 'undefined' ? null : _error; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'error', __vv__, null, 'error', null, null); 
			_error = __vv__;
		}
	});

	var _help_url;
	Object.defineProperty(this, 'help_url', {
		get: function() { return typeof(_help_url) == 'undefined' ? null : _help_url; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'help_url', __vv__, String, null, null, null); 
			_help_url = __vv__;
		}
	});

	var _result;
	Object.defineProperty(this, 'result', {
		get: function() { return typeof(_result) == 'undefined' ? null : _result; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'result', __vv__, null, 'result', null, 'result'); 
			_result = __vv__;
		}
	});

	var _success;
	Object.defineProperty(this, 'success', {
		get: function() { return typeof(_success) == 'undefined' ? null : _success; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'success', __vv__, Boolean, null, null, null); 
			_success = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.output.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.output 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.output.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.output 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.output.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		if (this.__property_names[i] == 'debug' && property) property = new Newgrounds.io.model.debug(this.__ngio, property);
		else if (this.__property_names[i] == 'error' && property) property = new Newgrounds.io.model.error(this.__ngio, property);
		else if (this.__property_names[i] == 'result' && property) property = new Newgrounds.io.model.result(this.__ngio, property);
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.output.prototype.constructor = Newgrounds.io.model.output;