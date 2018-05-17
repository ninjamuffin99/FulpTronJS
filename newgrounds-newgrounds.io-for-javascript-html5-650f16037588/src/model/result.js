/**
 * Contains information returned by an API component. 
 * @name Newgrounds.io.model.result 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} component - The name of the component that was executed (ie 'Medal.unlock').
 * @property {(object|object[])} data - An object, or array of one-or-more objects (follows the structure of the corresponding 'call' property), containing any returned properties or errors.
 * @property {object} echo - If you passed an 'echo' value in your call object, it will be echoed here. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.result = function(ngio, from_object) {

	/* private vars */
	var _component, _data, _echo;
	this.__property_names = ["component","data","echo"];
	this.__classname = "Newgrounds.io.model.result";
	this.__ngio = ngio;
	
	
	var _component;
	Object.defineProperty(this, 'component', {
		get: function() { return typeof(_component) == 'undefined' ? null : _component; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'component', __vv__, String, null, null, null); 
			_component = __vv__;
		}
	});

	var _data;
	Object.defineProperty(this, 'data', {
		get: function() { return typeof(_data) == 'undefined' ? null : _data; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'data', __vv__, Object, null, Object, null); 
			_data = __vv__;
		}
	});

	var _echo;
	Object.defineProperty(this, 'echo', {
		get: function() { return typeof(_echo) == 'undefined' ? null : _echo; },
		set: function(__vv__) {
			_echo = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.result.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.result 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.result.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.result 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.result.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.result.prototype.constructor = Newgrounds.io.model.result;