/**
 * Contains any icons associated with this user. 
 * @name Newgrounds.io.model.usericons 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} large - The URL of the user's large icon
 * @property {string} medium - The URL of the user's medium icon
 * @property {string} small - The URL of the user's small icon 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.usericons = function(ngio, from_object) {

	/* private vars */
	var _large, _medium, _small;
	this.__property_names = ["large","medium","small"];
	this.__classname = "Newgrounds.io.model.usericons";
	this.__ngio = ngio;
	
	
	var _large;
	Object.defineProperty(this, 'large', {
		get: function() { return typeof(_large) == 'undefined' ? null : _large; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'large', __vv__, String, null, null, null); 
			_large = __vv__;
		}
	});

	var _medium;
	Object.defineProperty(this, 'medium', {
		get: function() { return typeof(_medium) == 'undefined' ? null : _medium; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'medium', __vv__, String, null, null, null); 
			_medium = __vv__;
		}
	});

	var _small;
	Object.defineProperty(this, 'small', {
		get: function() { return typeof(_small) == 'undefined' ? null : _small; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'small', __vv__, String, null, null, null); 
			_small = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.usericons.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.usericons 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.usericons.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.usericons 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.usericons.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.usericons.prototype.constructor = Newgrounds.io.model.usericons;