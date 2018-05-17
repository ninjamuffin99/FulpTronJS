/**
 * Contains all the information needed to execute an API component. 
 * @name Newgrounds.io.model.call 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} component - The name of the component you want to call, ie 'App.connect'.
 * @property {object} echo - An optional value that will be returned, verbatim, in the #result object.
 * @property {(object|object[])} parameters - An object of parameters you want to pass to the component.
 * @property {string} secure - A an encrypted #call object or array of #call objects. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.call = function(ngio, from_object) {

	/* private vars */
	var _component, _echo, _parameters, _secure;
	this.__property_names = ["component","echo","parameters","secure"];
	this.__classname = "Newgrounds.io.model.call";
	this.__ngio = ngio;
	
	
	var _component;
	Object.defineProperty(this, 'component', {
		get: function() { return typeof(_component) == 'undefined' ? null : _component; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'component', __vv__, String, null, null, null); 
			_component = __vv__;
		}
	});

	var _echo;
	Object.defineProperty(this, 'echo', {
		get: function() { return typeof(_echo) == 'undefined' ? null : _echo; },
		set: function(__vv__) {
			_echo = __vv__;
		}
	});

	var _parameters;
	Object.defineProperty(this, 'parameters', {
		get: function() { return typeof(_parameters) == 'undefined' ? null : _parameters; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'parameters', __vv__, Object, null, Object, null); 
			_parameters = __vv__;
		}
	});

	var _secure;
	Object.defineProperty(this, 'secure', {
		get: function() { return typeof(_secure) == 'undefined' ? null : _secure; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'secure', __vv__, String, null, null, null); 
			_secure = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.call.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.call 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.call.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.call 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.call.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.call.prototype.constructor = Newgrounds.io.model.call;