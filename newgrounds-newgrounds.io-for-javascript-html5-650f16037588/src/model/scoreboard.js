/**
 * Contains information about a scoreboard. 
 * @name Newgrounds.io.model.scoreboard 
 * @constructor
 * @memberof Newgrounds.io.model
 * @property {number} id - The numeric ID of the scoreboard.
 * @property {string} name - The name of the scoreboard. 
 * @param {Newgrounds.io.core} [ngio] - A Newgrounds.io.core instance associated with the model object.
 * @param {object} [from_object] - A literal object used to populate this model's properties.
 */
Newgrounds.io.model.scoreboard = function(ngio, from_object) {

	/* private vars */
	var _id, _name;
	this.__property_names = ["id","name"];
	this.__classname = "Newgrounds.io.model.scoreboard";
	this.__ngio = ngio;
	
	
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
	if(from_object) this.fromObject(from_object);
};

Newgrounds.io.model.scoreboard.prototype._has_ngio_user = function() {
	return (this.__ngio && this.__ngio.user);
}

/**
 * Converts the model instance to a literal object.
 * @instance
 * @memberof Newgrounds.io.model.scoreboard 
 * @function toObject
 * @return {object}
 */
Newgrounds.io.model.scoreboard.prototype.toObject = function() {
	var object = {};
	for(var i=0; i<this.__property_names.length; i++) {
		if (typeof(this[this.__property_names[i]]) != 'undefined') object[this.__property_names[i]] = this[this.__property_names[i]];
	}
	return object;
};

/**
 * Populates the model instance using a literal object.
 * @instance
 * @memberof Newgrounds.io.model.scoreboard 
 * @function fromObject
 * @param {object} object - An object containing property/value pairs
 */
Newgrounds.io.model.scoreboard.prototype.fromObject = function(object) {
	var property, model;
	for(var i=0; i<this.__property_names.length; i++) {
		property = object[this.__property_names[i]]; 
		this[this.__property_names[i]] = property;
	}
};

/**
 * Calls the 'ScoreBoard.postScore' component using this scoreboard and the score info provided.
 * @instance
 * @memberof Newgrounds.io.model.scoreboard 
 * @function postScore
 * @param {number} score - The flat, numeric value of the score to post.
 * @param {string} [tag] - An optional tag that can be used to filter this score.
 * @param {Newgrounds.io.model.scoreboard~onScorePosted} [callback] - Called when score is posted
 */
Newgrounds.io.model.scoreboard.prototype.postScore = function(score, tag, callback) {
	var board = this;
	
	if (typeof(tag) == 'function' && !callback) {
		callback = tag;
		tag = null;
	}
	if (!tag) tag = null;
	
	if (this._has_ngio_user()) {
		this.__ngio.callComponent('ScoreBoard.postScore', {id:this.id, value:score, tag:tag}, function(result) {
			callback(result);
		});
	} else if (typeof(callback) == 'function') {
		var error = Newgrounds.io.model.error.get("This function requires a valid user session.", Newgrounds.io.model.error.LOGIN_REQUIRED);
		var result = {success:false, error:error};
		callback(result);
	}
}

/**
 * Callback used by Newgrounds.io.model.scoreboard.postScore
 * @callback Newgrounds.io.model.scoreboard~onScorePosted
 * @param {object} result - The results from the component call.
 */
Newgrounds.io.model.scoreboard.prototype.constructor = Newgrounds.io.model.scoreboard;