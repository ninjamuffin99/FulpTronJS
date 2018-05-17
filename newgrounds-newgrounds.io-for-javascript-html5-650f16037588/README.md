![ngio_banner_small.png](https://bitbucket.org/repo/85X7LM/images/2671801611-ngio_banner_small.png)

# Newgrounds.io for JavaScript/HTML5

This is a client library used to interact with the Newgrounds.io server.

Get full repository at https://bitbucket.org/newgrounds/newgrounds.io-for-javascript-html5/downloads

Browse source files at https://bitbucket.org/newgrounds/newgrounds.io-for-javascript-html5/src

# What is Newgrounds.io?

Newgrounds.io is a server API packed full of features for indie game developers.  

Here are some of the many things it can do for you:

 * Track distribution of web-based games.
 * Control what sites can host web-based games.
 * Log statistics for custom events.
 * Track referrals from in-game links.
 * Add in-game achievements (medals).
 * Add score tables.

# Getting Started

Newgrounds.io is currently in private Beta.  To request an invitation, join the Newgrounds.io Developers group at https://groups.google.com/d/forum/newgroundsio-developers

Before you can use this library, you will need to create a project on http://www.newgrounds.com/projects/games and obtain an app id from your new project's "API Tools" page.  Be sure you have switched to the v3 beta!

# Usage

Using the Newgrounds.io.core class to make calls to the server is extremely easy!

    :::javascript
    var ngio = new Newgrounds.io.core(app_id, aes_encryption_key);
    
    ngio.callComponent(component_name, parameters_object, callback_function, callback_context);

The context is an optional parameter through which you can specify the context under which the callback function will be executed. Practically all methods which support callbacks can also take a context parameter.

Let's try a real, working, example.  This will load the current datetime on the server:

    :::javascript
    var ngio = new Newgrounds.io.core("39685:NJ1KkPGb", "qsqKxz5dJouIkUNe3NBppQ==");
    
    ngio.callComponent("Gateway.getDatetime", {}, function(result) {
       if (result.success) {
            console.log('The current date/time on the Newgrounds.io server is '+result.datetime);
       } else {
            console.log('ERROR!', result.error.message);
       }
    });

Get your player signed in via Newgrounds Passport (using a Newgrounds.com, Facebook or Google+ account):

	:::javascript
	var ngio = new Newgrounds.io.core("39685:NJ1KkPGb", "qsqKxz5dJouIkUNe3NBppQ==");
	
	function onLoggedIn() {
		console.log("Welcome " + ngio.user.name + "!");
	}
	
	function onLoginFailed() {
		console.log("There was a problem logging in: " . ngio.login_error.message );
	}
	
	function onLoginCancelled() {
		console.log("The user cancelled the login.");
	}
	
	/*
	 * Before we do anything, we need to get a valid Passport session.  If the player
	 * has previously logged in and selected 'remember me', we may have a valid session
	 * already saved locally.
	 */
	function initSession() {
		ngio.getValidSession(function() {
			if (ngio.user) {
				/* 
				 * If we have a saved session, and it has not expired, 
				 * we will also have a user object we can access.
				 * We can go ahead and run our onLoggedIn handler here.
				 */
				onLoggedIn();
			} else {
				/*
				 * If we didn't have a saved session, or it has expired
				 * we should have been given a new one at this point.
				 * This is where you would draw a 'sign in' button and
				 * have it execute the following requestLogin function.
				 */
			}
			
		});
	}
	
	/* 
	 * Call this when the user clicks a 'sign in' button from your game.  It MUST be called from
	 * a mouse-click event or pop-up blockers will prevent the Newgrounds Passport page from loading.
	 */
	function requestLogin() {
		ngio.requestLogin(onLoggedIn, onLoginFailed, onLoginCancelled);
		/* you should also draw a 'cancel login' buton here */
	}
	
	/*
	 * Call this when the user clicks a 'cancel login' button from your game.
	 */
	function cancelLogin() {
		/*
		 * This cancels the login request made in the previous function. 
		 * This will also trigger your onLoginCancelled callback.
		 */
		ngio.cancelLoginRequest();
	}
	
	/*
	 * If your user is logged in, you should also draw a 'sign out' button for them
	 * and have it call this.
	 */
	function logOut() {
		ngio.logOut(function() {
			/*
			 * Because we have to log the player out on the server, you will want
			 * to handle any post-logout stuff in this function, wich fires after
			 * the server has responded.
			 */
		});
	}

Make multiple component calls in a single request:

    :::javascript
	var ngio = new Newgrounds.io.core("39685:NJ1KkPGb", "qsqKxz5dJouIkUNe3NBppQ==");
	
	/* vars to record any medals and scoreboards that get loaded */
	var medals, scoreboards;
	
	/* handle loaded medals */
	function onMedalsLoaded(result) {
		if (result.success) medals = result.medals;
	}
	
	/* handle loaded scores */
	function onScoreboardsLoaded(result) {
		if (result.success) scoreboards = result.scoreboards;
	}
	
	/* load our medals and scoreboards from the server */
	ngio.queueComponent("Medal.getList", {}, onMedalsLoaded);
	ngio.queueComponent("ScoreBoard.getBoards", {}, onScoreboardsLoaded);
	ngio.executeQueue();

Want to unlock one of those medals we just loaded?

	:::javascript
	/* You could use this function to draw the medal notification on-screen */
	function onMedalUnlocked(medal) {
		console.log('MEDAL GET:', medal.name);
	}
	
	function unlockMedal(medal_name) {
		
		/* If there is no user attached to our ngio object, it means the user isn't logged in and we can't unlock anything */
		if (!ngio.user) return;
		
		var medal;
		
		for (var i = 0; i < medals.length; i++) {
			
			medal = medal[i];
			
			/* look for a matching medal name */
			if (medal.name == medal_name) {
				
				/* we can skip unlocking a medal that's already been earned */
				if (!medal.unlocked) {
				
					/* unlock the medal from the server */
					ngio.callComponent('Medal.unlock', {id:medal.id}, function(result) {
						
						if (result.success) onMedalUnlocked(result.medal);
						
					});
				}
				
				return;
			}
		}
	}
	
	/* lets unlock a medal!!! */
	unlockMedal('test medal 1');

Or post a score?

	:::javascript
	function postScore(board_name, score_value) {
		
		/* If there is no user attached to our ngio object, it means the user isn't logged in and we can't post anything */
		if (!ngio.user) return;
		
		var score;
		
		for (var i = 0; i < scoreboards.length; i++) {
			
			scoreboard = scoreboards[i];
			
			ngio.callComponent('ScoreBoard.postScore', {id:scoreboard.id, value:score_value});
		}
	}
	
	postScore('test scores', 1234);

# Error Handling

You should always be prepared to handle an error from the API.  When contacting Newgrounds support, you will be expected to provide any error messages you are receiving from the server.

Handling errors is as easy as this:

	:::javascript
	ngio.callComponent(component, params, function(result) {

		if (result.success) {
			// no problems here
		} else {
			// there was an error!
			var error_msg = result.error.message;
		}

	});

# Debugging

Newgrounds.io can operate in debug mode.  While in this mode, calls to any components that normally post data to a user account will not post anything, but rather, simulate a real post.

Additionally, if you watch the server results via your browser's network inspector, JSON objects will contain a lot more meta information and be much more readable in debug mode.

To enable debug mode, simply set 'debug' to true:

	:::javascript
	ngio.debug = true;

# Learning & Help

API docs for this library are included in the repository.  See: doc/api/index.html 

Documentation for server components can be found at http://www.newgrounds.com/wiki/creator-resources/newgrounds-apis/newgrounds-io/components

Join the Developer's Group at https://groups.google.com/d/forum/newgroundsio-developers

Follow us on Twitter https://twitter.com/Newgroundsio

# License - Newgrounds.io Library

Copyright (c) 2015 Newgrounds Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# License - Crypto.JS

CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License