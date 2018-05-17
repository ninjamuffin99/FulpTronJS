/**
 * Contains information about a score posted to a scoreboard. 
 * @name Newgrounds.io.model.score 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} formatted_value - The score value in the format selected in your scoreboard settings.
 * @property {string} tag - The tag attached to this score (if any).
 * @property {Newgrounds.io.model.user} user - The user who earned score. If this property is absent, the score belongs to the active user.
 * @property {number} value - The integer value of the score. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.score = function(ngio, from_object) {

	/* private vars */
	var _formatted_value, _tag, _user, _value;
	this.__property_names = ["formatted_value","tag","user","value"];
	this.__classname = "Newgrounds.io.model.score";
	this.__ngio = ngio;
	
	
	var _formatted_value;
	Object.defineProperty(this, 'formatted_value', {
		get: function() { return typeof(_formatted_value) == 'undefined' ? null : _formatted_value; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'formatted_value', __vv__, String, null, null, null); 
			_formatted_value = __vv__;
		}
	});

	var _tag;
	Object.defineProperty(this, 'tag', {
		get: function() { return typeof(_tag) == 'undefined' ? null : _tag; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'tag', __vv__, String, null, null, null); 
			_tag = __vv__;
		}
	});

	var _user;
	Object.defineProperty(this, 'user', {
		get: function() { return typeof(_user) == 'undefined' ? null : _user; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'user', __vv__, null, 'user', null, null); 
			_user = __vv__;
		}
	});

	var _value;
	Object.defineProperty(this, 'value', {
		get: function() { return typeof(_value) == 'undefined' ? null : _value; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'value', __vv__, Number, null, null, null); 
			_value = __vv__;
		}
	});
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.score.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.score 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.score.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.score 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.score.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		if (this.__property_names[i] == 'user' && property) property = new Newgrounds.io.model.user(this.__ngio, property);
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.score.prototype.constructor = Newgrounds.io.model.score;