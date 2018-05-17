jQuery(document).ready(function() {

	var $ = jQuery; // $ alias
	
	// ngio configuration
	var host = "unit-test.newgrounds.io";
	var version = "1.0.0";
	var app_id = "39685:NJ1KkPGb";
	var encrypt_key = "qsqKxz5dJouIkUNe3NBppQ==";

	// create our ngio instance and put it in debug mode
	var ngio = new Newgrounds.io.core(app_id, encrypt_key);
	ngio.debug = true;

	// this is our output textarea
	var output_text = $('#output_text');
	
	// our log out button
	var log_out = $('#log_out');
	
	// the div that contains our login button and waiting message
	var login_prompt = $('#login_prompt');
	
	// the login button
	var login_link = $("#login_link", login_prompt);
	
	// the cancel login button
	var cancel_link = $("#cancel_link", login_prompt);
	
	// the waiting for login message
	var login_wait = $("p", login_prompt);
	
	// hide out login prompt and logout button until they are needed
	login_prompt.hide();

	// adds text to our output textarea
	function addOutput(output) {
		output_text.append(output + "\n");
	}

	$("#testLoadNewgrounds").click(function() {
		ngio.callComponent('Loader.loadNewgrounds', {host: host}, function(result) {
			window.open(result.url, "_blank");
		});
		return false;
	});
	
	// a wrapper that calls an API component and renders a pass/fail comment in our output textarea
	function testComponent(component, params, callback) {
		ngio.callComponent(component, params, function(result) {
			console.log("callComponent", component, params, result);
			addOutput(component + " :: " + (result.success ? "PASSED!":"FAILED..."));
			if (typeof(callback) == 'function') callback(result);
		});
	}

	// an array of component calls and parameters for simple testing.  None of these require a logged in user.
	var simple_tests = [
		['Gateway.getDatetime',			{}],
		['Gateway.getVersion',			{}],
		['Gateway.ping',				{}],
		['App.logView', 				{host: host}],
		['App.getCurrentVersion',		{version: version}],
		['App.getHostLicense',			{host: host}],
		['Event.logEvent',				{event_name: "test event", host: host}],
		['Loader.loadAuthorUrl',		{host: host, redirect:false}],
		['Loader.loadMoreGames',		{host: host, redirect:false}],
		['Loader.loadNewgrounds',		{host: host, redirect:false}],
		['Loader.loadOfficialUrl',		{host: host, redirect:false}],
		['Loader.loadReferral',			{referral_name: "test referral", host: host, redirect:false}]
	];

	// test all the calls in the above array
	function executeNextSimpleTest() {
		var test = simple_tests.shift();
		testComponent(test[0], test[1]);
		if (simple_tests.length > 0) {
			setTimeout(executeNextSimpleTest,1000);
		} else {
			testMedals();
		}
	}
	
	// test Medal components (requires user is logged in)
	function testMedals() {
		
		// load medals
		testComponent("Medal.getList", {}, function(result) {
			
			// we have medals, let's unlock one...
			if (result.success && result.medals && result.medals.length > 0) {
				testComponent("Medal.unlock", {id:result.medals[0].id}, function() {
					testScores(); //next test
				});
				
			// no medals to test..
			} else {
				testScores(); //next test
			}
		});
	}
	
	// test ScoreBoard components (requires user is logged in)
	function testScores() {
		
		// load scoreboards
		testComponent("ScoreBoard.getBoards", {}, function(result) {
			
			// we have scoreboards, let's post a random score, and load the score table
			if (result.success && result.scoreboards && result.scoreboards.length > 0) {
				
				var score = Math.round(Math.random() * 9999);
				testComponent("ScoreBoard.postScore", {id: result.scoreboards[0].id, value: score});
				
				// so this on a delay so our new score can show up
				setTimeout(function() {
					testComponent("ScoreBoard.getScores", {id: result.scoreboards[0].id, period: "A"}, function() { endTests(); });
				}, 2000);
				
			// no scoreboards to test.
			} else {
				endTests();
			}
		});
	}

	function endTests() {
		addOutput("-=:: TESTS COMPLETE ::=-");
	}
	
	// handle login/session states
	function requestLogin() {
		// show our 'waiting for login' message
		login_link.hide();
		login_wait.show();
		addOutput("Loading Newgrounds Passport...");
		ngio.requestLogin(onLoggedIn, onLoginFailed, onLoginCancelled);	
	}
	
	function onLoggedIn() {
		login_prompt.hide();
		log_out.show();
		ngio.getSessionLoader().closePassport();
		addOutput("Logged in as " + ngio.user.name + "\n");
		executeNextSimpleTest();
	}
	
	function onLoggedOut() {
		log_out.hide();
		addOutput("Logged out...");
		ngio.getSessionLoader().closePassport();
		initSession();
	}
	
	function onLoginCancelled() {
		addOutput("Login cancelled. ");
		onLoggedOut();
	}
	
	function onLoginFailed() {
		addOutput("Your login has failed. Your session may be expired.");
		onLoggedOut();
	}
	
	// click handler for our log out button
	log_out.click(function() {
		ngio.logOut(onLoggedOut); // log out
		return false;
	});
	
	// click handler for our log in button
	login_link.click(function() {
		requestLogin();
		return false;
	});
	
	// click handler for our cancel login button
	cancel_link.click(function() {
		// this will trigger onLoginCancelled as it was used as the cancel callback in ngio.requestLogin()
		ngio.cancelLoginRequest(); 
		return false;
	});
	
	// makes sure we have a valid app session before we start testing
	function initSession() {
		ngio.getValidSession(function() {
			
			if (ngio.user == null) {
				// show our login button
				login_prompt.show();
				login_link.show();
				login_wait.hide();
				addOutput("Please sign in...");
			} else {
				onLoggedIn();
			}
			
		});
	}
	
	// start the unit test!
	initSession();
});