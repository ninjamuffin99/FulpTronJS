/**
 * Contains extra debugging information. 
 * @name Newgrounds.io.model.debug 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} exec_time - The time, in milliseconds, that it took to execute a request.
 * @property {Newgrounds.io.model.input} input - A copy of the input object that was posted to the server. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.debug = function(ngio, from_object) {

	/* private vars */
	var _exec_time, _input;
	this.__property_names = ["exec_time","input"];
	this.__classname = "Newgrounds.io.model.debug";
	this.__ngio = ngio;
	
	
	var _exec_time;
	Object.defineProperty(this, 'exec_time', {
		get: function() { return typeof(_exec_time) == 'undefined' ? null : _exec_time; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'exec_time', __vv__, String, null, null, null); 
			_exec_time = __vv__;
		}
	});

	var _input;
	Object.defineProperty(this, 'input', {
		get: function() { return typeof(_input) == 'undefined' ? null : _input; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'input', __vv__, null, 'input', null, null); 
			_input = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.debug.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.debug 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.debug.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.debug 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.debug.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		if (this.__property_names[i] == 'input' && property) property = new Newgrounds.io.model.input(this.__ngio, property);
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.debug.prototype.constructor = Newgrounds.io.model.debug;