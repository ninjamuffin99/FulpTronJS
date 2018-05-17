/**
 * Contains information about a user. 
 * @name Newgrounds.io.model.user 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {Newgrounds.io.model.usericons} icons - The user's icon images.
 * @property {number} id - The user's numeric ID.
 * @property {string} name - The user's textual name.
 * @property {boolean} supporter - Returns true if the user has a Newgrounds Supporter upgrade. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.user = function(ngio, from_object) {

	/* private vars */
	var _icons, _id, _name, _supporter;
	this.__property_names = ["icons","id","name","supporter"];
	this.__classname = "Newgrounds.io.model.user";
	this.__ngio = ngio;
	
	
	var _icons;
	Object.defineProperty(this, 'icons', {
		get: function() { return typeof(_icons) == 'undefined' ? null : _icons; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'icons', __vv__, null, 'usericons', null, null); 
			_icons = __vv__;
		}
	});

	var _id;
	Object.defineProperty(this, 'id', {
		get: function() { return typeof(_id) == 'undefined' ? null : _id; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'id', __vv__, Number, null, null, null); 
			_id = __vv__;
		}
	});

	var _name;
	Object.defineProperty(this, 'name', {
		get: function() { return typeof(_name) == 'undefined' ? null : _name; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'name', __vv__, String, null, null, null); 
			_name = __vv__;
		}
	});

	var _supporter;
	Object.defineProperty(this, 'supporter', {
		get: function() { return typeof(_supporter) == 'undefined' ? null : _supporter; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'supporter', __vv__, Boolean, null, null, null); 
			_supporter = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.user.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.user 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.user.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.user 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.user.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		if (this.__property_names[i] == 'icons' && property) property = new Newgrounds.io.model.usericons(this.__ngio, property);
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.user.prototype.constructor = Newgrounds.io.model.user;