/**
 * Contains information about a medal. 
 * @name Newgrounds.io.model.medal 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {string} description - A short description of the medal.
 * @property {number} difficulty - The difficulty id of the medal.
 * @property {string} icon - The URL for the medal's icon.
 * @property {number} id - The numeric ID of the medal.
 * @property {string} name - The name of the medal.
 * @property {boolean} unlocked - This will only be set if a valid user session exists.
 * @property {number} value - The medal's point value. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.medal = function(ngio, from_object) {

	/* private vars */
	var _description, _difficulty, _icon, _id, _name, _secret, _unlocked, _value;
	this.__property_names = ["description","difficulty","icon","id","name","secret","unlocked","value"];
	this.__classname = "Newgrounds.io.model.medal";
	this.__ngio = ngio;
	
	
	var _description;
	Object.defineProperty(this, 'description', {
		get: function() { return typeof(_description) == 'undefined' ? null : _description; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'description', __vv__, String, null, null, null); 
			_description = __vv__;
		}
	});

	var _difficulty;
	Object.defineProperty(this, 'difficulty', {
		get: function() { return typeof(_difficulty) == 'undefined' ? null : _difficulty; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'difficulty', __vv__, Number, null, null, null); 
			_difficulty = __vv__;
		}
	});

	var _icon;
	Object.defineProperty(this, 'icon', {
		get: function() { return typeof(_icon) == 'undefined' ? null : _icon; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'icon', __vv__, String, null, null, null); 
			_icon = __vv__;
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

	var _secret;
	Object.defineProperty(this, 'secret', {
		get: function() { return typeof(_secret) == 'undefined' ? null : _secret; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'secret', __vv__, Boolean, null, null, null); 
			_secret = __vv__;
		}
	});

	var _unlocked;
	Object.defineProperty(this, 'unlocked', {
		get: function() { return typeof(_unlocked) == 'undefined' ? null : _unlocked; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'unlocked', __vv__, Boolean, null, null, null); 
			_unlocked = __vv__;
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

Newgrounds.io.model.medal.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.medal 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.medal.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.medal 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.medal.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		this[this.__property_names[i]] = property;
	}
};

/**
 * Calls 'Medal.unlock' component using this medal and updates the unlocked property accordingly.
 * @instance
 * @memberof Newgrounds.io.model.medal 
 * @function unlock
 * @param {Newgrounds.io.model.medal~onUnlocked} [callback] - Called on success
 */
Newgrounds.io.model.medal.prototype.unlock = function(callback) {
	var medal = this;
	
	if (this._has_ngio_user()) {
		this.__ngio.callComponent('Medal.unlock', {id:this.id}, function(result) {
			if (result.success) this.unlocked = true;
			callback(result);
		});
	} else if (typeof(callback) == 'function') {
		var error = Newgrounds.io.model.error.get("This function requires a valid user session.", Newgrounds.io.model.error.LOGIN_REQUIRED);
		var result = {success:false, error:error};
		callback(result);
	}
}

/**
 * Callback used by Newgrounds.io.model.medal.unlock
 * @callback Newgrounds.io.model.medal~onUnlocked
 * @param {object} result - The results from the component call.
 */
Newgrounds.io.model.medal.prototype.constructor = Newgrounds.io.model.medal;