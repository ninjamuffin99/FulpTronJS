/* start validators.js */

Newgrounds.io.call_validators.getValidator = function(component) {
	var c = component.split(".");
	var classname = c[0];
	var method = c[1];
	
	var validator = (Newgrounds.io.call_validators[classname] && Newgrounds.io.call_validators[classname][method]) ? Newgrounds.io.call_validators[classname][method] : null;
	return validator;
};

/**
 * Contains validation rules for calls within the 'App' component.
 * @memberof Newgrounds.io.call_validators
 * @type {object}
 */
Newgrounds.io.call_validators.App = { 

	/**
	 * @property {object} checkSession - Contains rules for validating calls to 'App.checkSession'.
	 */
	checkSession: {"require_session":true,"secure":false,"redirect":false,"import":false,"params":{},"returns":{"session":{"object":"session","description":null}}}, 

	/**
	 * @property {object} endSession - Contains rules for validating calls to 'App.endSession'.
	 */
	endSession: {"require_session":true,"secure":false,"redirect":false,"import":false,"params":{},"returns":{}}, 

	/**
	 * @property {object} getCurrentVersion - Contains rules for validating calls to 'App.getCurrentVersion'.
	 */
	getCurrentVersion: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{"version":{"type":String,"extract_from":null,"required":null,"description":"The version number (in \"X.Y.Z\" format) of the client-side app. (default = \"0.0.0\")"}},"returns":{}}, 

	/**
	 * @property {object} getHostLicense - Contains rules for validating calls to 'App.getHostLicense'.
	 */
	getHostLicense: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":null,"description":"The host domain to check (ei, somesite.com)."}},"returns":{}}, 

	/**
	 * @property {object} logView - Contains rules for validating calls to 'App.logView'.
	 */
	logView: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Examples: \"www.somesite.com\", \"localHost\""}},"returns":{}}, 

	/**
	 * @property {object} startSession - Contains rules for validating calls to 'App.startSession'.
	 */
	startSession: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{"force":{"type":Boolean,"extract_from":null,"required":null,"description":"If true, will create a new session even if the user already has an existing one.\n\nNote: Any previous session ids will no longer be valid if this is used."}},"returns":{"session":{"object":"session","description":null}}} 

};
/**
 * Contains validation rules for calls within the 'Event' component.
 * @memberof Newgrounds.io.call_validators
 * @type {object}
 */
Newgrounds.io.call_validators.Event = { 

	/**
	 * @property {object} logEvent - Contains rules for validating calls to 'Event.logEvent'.
	 */
	logEvent: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{"event_name":{"type":String,"extract_from":null,"required":true,"description":"The name of your custom event as defined in your Referrals & Events settings."},"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Example: \"newgrounds.com\", \"localHost\""}},"returns":{}} 

};
/**
 * Contains validation rules for calls within the 'Gateway' component.
 * @memberof Newgrounds.io.call_validators
 * @type {object}
 */
Newgrounds.io.call_validators.Gateway = { 

	/**
	 * @property {object} getDatetime - Contains rules for validating calls to 'Gateway.getDatetime'.
	 */
	getDatetime: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{},"returns":{}}, 

	/**
	 * @property {object} getVersion - Contains rules for validating calls to 'Gateway.getVersion'.
	 */
	getVersion: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{},"returns":{}}, 

	/**
	 * @property {object} ping - Contains rules for validating calls to 'Gateway.ping'.
	 */
	ping: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{},"returns":{}} 

};
/**
 * Contains validation rules for calls within the 'Loader' component.
 * @memberof Newgrounds.io.call_validators
 * @type {object}
 */
Newgrounds.io.call_validators.Loader = { 

	/**
	 * @property {object} loadAuthorUrl - Contains rules for validating calls to 'Loader.loadAuthorUrl'.
	 */
	loadAuthorUrl: {"require_session":false,"secure":false,"redirect":true,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Example: \"www.somesite.com\", \"localHost\""},"redirect":{"type":Boolean,"extract_from":null,"required":false,"description":"Set this to false to get a JSON response containing the URL instead of doing an actual redirect."}},"returns":{}}, 

	/**
	 * @property {object} loadMoreGames - Contains rules for validating calls to 'Loader.loadMoreGames'.
	 */
	loadMoreGames: {"require_session":false,"secure":false,"redirect":true,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Example: \"www.somesite.com\", \"localHost\""},"redirect":{"type":Boolean,"extract_from":null,"required":false,"description":"Set this to false to get a JSON response containing the URL instead of doing an actual redirect."}},"returns":{}}, 

	/**
	 * @property {object} loadNewgrounds - Contains rules for validating calls to 'Loader.loadNewgrounds'.
	 */
	loadNewgrounds: {"require_session":false,"secure":false,"redirect":true,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Example: \"www.somesite.com\", \"localHost\""},"redirect":{"type":Boolean,"extract_from":null,"required":false,"description":"Set this to false to get a JSON response containing the URL instead of doing an actual redirect."}},"returns":{}}, 

	/**
	 * @property {object} loadOfficialUrl - Contains rules for validating calls to 'Loader.loadOfficialUrl'.
	 */
	loadOfficialUrl: {"require_session":false,"secure":false,"redirect":true,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Example: \"www.somesite.com\", \"localHost\""},"redirect":{"type":Boolean,"extract_from":null,"required":false,"description":"Set this to false to get a JSON response containing the URL instead of doing an actual redirect."}},"returns":{}}, 

	/**
	 * @property {object} loadReferral - Contains rules for validating calls to 'Loader.loadReferral'.
	 */
	loadReferral: {"require_session":false,"secure":false,"redirect":true,"import":false,"params":{"host":{"type":String,"extract_from":null,"required":true,"description":"The domain hosting your app. Example: \"www.somesite.com\", \"localHost\""},"redirect":{"type":Boolean,"extract_from":null,"required":false,"description":"Set this to false to get a JSON response containing the URL instead of doing an actual redirect."},"referral_name":{"type":String,"extract_from":null,"required":true,"description":"The name of the referral (as defined in your \"Referrals & Events\" settings)."}},"returns":{}} 

};
/**
 * Contains validation rules for calls within the 'Medal' component.
 * @memberof Newgrounds.io.call_validators
 * @type {object}
 */
Newgrounds.io.call_validators.Medal = { 

	/**
	 * @property {object} getList - Contains rules for validating calls to 'Medal.getList'.
	 */
	getList: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{},"returns":{"medals":{"array":{"object":"medal"},"description":"An array of medal objects."}}}, 

	/**
	 * @property {object} unlock - Contains rules for validating calls to 'Medal.unlock'.
	 */
	unlock: {"require_session":true,"secure":true,"redirect":false,"import":false,"params":{"id":{"type":Number,"extract_from":{"object":"medal","alias":"medal","property":"id"},"required":true,"description":"The numeric ID of the medal to unlock."}},"returns":{"medal":{"object":"medal","description":"The #medal that was unlocked."}}} 

};
/**
 * Contains validation rules for calls within the 'ScoreBoard' component.
 * @memberof Newgrounds.io.call_validators
 * @type {object}
 */
Newgrounds.io.call_validators.ScoreBoard = { 

	/**
	 * @property {object} getBoards - Contains rules for validating calls to 'ScoreBoard.getBoards'.
	 */
	getBoards: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{},"returns":{"scoreboards":{"array":{"object":"scoreboard"},"description":"An array of #scoreboard objects."}}}, 

	/**
	 * @property {object} getScores - Contains rules for validating calls to 'ScoreBoard.getScores'.
	 */
	getScores: {"require_session":false,"secure":false,"redirect":false,"import":false,"params":{"id":{"type":Number,"extract_from":{"object":"scoreboard","alias":"scoreboard","property":"id"},"required":true,"description":"The numeric ID of the scoreboard."},"limit":{"type":Number,"extract_from":null,"required":null,"description":"An integer indicating the number of scores to include in the list. Default = 10."},"period":{"type":String,"extract_from":null,"required":null,"description":"The time-frame to pull scores from (see notes for acceptable values)."},"skip":{"type":Number,"extract_from":null,"required":null,"description":"An integer indicating the number of scores to skip before starting the list. Default = 0."},"social":{"type":Boolean,"extract_from":null,"required":null,"description":"If set to true, only social scores will be loaded (scores by the user and their friends). This param will be ignored if there is no valid session id and the 'user' param is absent."},"tag":{"type":String,"extract_from":null,"required":null,"description":"A tag to filter results by."},"user":{"type":"mixed","extract_from":null,"required":null,"description":"A user's ID or name.  If 'social' is true, this user and their friends will be included. Otherwise, only scores for this user will be loaded. If this param is missing and there is a valid session id, that user will be used by default."}},"returns":{"scoreboard":{"object":"scoreboard","description":"The #scoreboard being queried."},"scores":{"array":{"object":"score"},"description":"An array of #score objects."},"user":{"object":"user","description":"The #user the score list is associated with (either as defined in the 'user' param, or extracted from the current session when 'social' is set to true)"}}}, 

	/**
	 * @property {object} postScore - Contains rules for validating calls to 'ScoreBoard.postScore'.
	 */
	postScore: {"require_session":true,"secure":true,"redirect":false,"import":false,"params":{"id":{"type":Number,"extract_from":{"object":"scoreboard","alias":"scoreboard","property":"id"},"required":true,"description":"The numeric ID of the scoreboard."},"tag":{"type":String,"extract_from":null,"required":null,"description":"An optional tag that can be used to filter scores via ScoreBoard.getScores"},"value":{"type":Number,"extract_from":null,"required":true,"description":"The int value of the score."}},"returns":{"score":{"object":"score","description":"The #score that was posted to the board."},"scoreboard":{"object":"scoreboard","description":"The #scoreboard that was posted to."}}} 

};


/* end validators.js */

