/* start namespaces.js */

if (typeof(Newgrounds) == 'undefined') {
	/**
	 * Newgrounds namespace
	 * @namespace
	 */
	Newgrounds = {};
}

/**
 * Newgrounds.io namespace
 * @memberof Newgrounds
 * @type {object}
 * @version 1.0
 * @namespace Newgrounds.io
 */
Newgrounds.io = {
	/**
	 * @property {string} GATEWAY_URI - The script all commands get posted to
	 */
	GATEWAY_URI: '//newgrounds.io/gateway_v3.php'
};

/**
 * Newgrounds.io.events namespace
 * @memberof Newgrounds.io
 * @type {object}
 * @namespace Newgrounds.io.events
 */
Newgrounds.io.events = {};


/**
 * Newgrounds.io.call_validators namespace
 * @memberof Newgrounds.io
 * @type {object}
 * @namespace Newgrounds.io.call_validators
 */
Newgrounds.io.call_validators = {};

/**
 * Newgrounds.io.model namespace
 * @memberof Newgrounds.io
 * @type {object}
 * @namespace Newgrounds.io.model
 */
Newgrounds.io.model = {
	/* Used to enforce strict typing */
	checkStrictValue: function(classname, property, value, type, model, array_type, array_model) {
		if (type == 'mixed') return true;
		if (value === null || typeof(value) == 'undefined') return true;
		if (type && value.constructor === type) return true;
		if (type == Boolean && value.constructor === Number) return true;
		if (model && value.constructor === Newgrounds.io.model[model]) return true;
		if (value.constructor === Array && (array_type || array_model)) {
			for (var i=0; i<value.length; i++) {
				this.checkStrictValue(classname, property, value[i], array_type, array_model, null, null);
			}
			return true;
		}
		
		if (classname) throw new Error("Illegal '"+property+"' value set in model "+classname);
		
		return false;
	}
}

/* end namespaces.js */

