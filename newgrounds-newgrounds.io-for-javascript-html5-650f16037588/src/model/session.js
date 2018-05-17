/**
 * Contains information about the current user session. 
 * @name Newgrounds.io.model.session 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {boolean} expired - If true, the session_id is expired. Use App.startSession to get a new one.
 * @property {string} id - A unique session identifier
 * @property {string} passport_url - If the session has no associated user but is not expired, this property will provide a URL that can be used to sign the user in.
 * @property {boolean} remember - If true, the user would like you to remember their session id.
 * @property {Newgrounds.io.model.user} user - If the user has not signed in, or granted access to your app, this will be null 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.session = function(ngio, from_object) {

	/* private vars */
	var _expired, _id, _passport_url, _remember, _user;
	this.__property_names = ["expired","id","passport_url","remember","user"];
	this.__classname = "Newgrounds.io.model.session";
	this.__ngio = ngio;
	
	
	var _expired;
	Object.defineProperty(this, 'expired', {
		get: function() { return typeof(_expired) == 'undefined' ? null : _expired; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'expired', __vv__, Boolean, null, null, null); 
			_expired = __vv__;
		}
	});

	var _id;
	Object.defineProperty(this, 'id', {
		get: function() { return typeof(_id) == 'undefined' ? null : _id; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'id', __vv__, String, null, null, null); 
			_id = __vv__;
		}
	});

	var _passport_url;
	Object.defineProperty(this, 'passport_url', {
		get: function() { return typeof(_passport_url) == 'undefined' ? null : _passport_url; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'passport_url', __vv__, String, null, null, null); 
			_passport_url = __vv__;
		}
	});

	var _remember;
	Object.defineProperty(this, 'remember', {
		get: function() { return typeof(_remember) == 'undefined' ? null : _remember; },
		set: function(__vv__) {
			Newgrounds.io.model.checkStrictValue(this.__classname, 'remember', __vv__, Boolean, null, null, null); 
			_remember = __vv__;
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
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.session.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.session 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.session.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.session 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.session.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		if (this.__property_names[i] == 'user' && property) property = new Newgrounds.io.model.user(this.__ngio, property);
		this[this.__property_names[i]] = property;
	}
};


Newgrounds.io.model.session.prototype.constructor = Newgrounds.io.model.session;