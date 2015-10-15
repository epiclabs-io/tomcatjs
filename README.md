tomcatjs
========
nodejs-based Tomcat Manager client library

tomcatjs is a simple library that interfaces with Tomcat Manager to allow programmatic access to its API via Nodejs JavaScript.
Tested only with Tomcat7

Install
-------

```bash
npm install tomcatjs --save
```
Usage
-----

First of all, initialize the Manager object:

```javascript
var tomcatjs = require("tomcatjs");

var manager = new tomcatjs.Manager("localhost", 8080, "tomcatManagerUser", "tomcatManagerPassword");
```

Right now only two APIs are implemented, list and undeploy. To obtain a list of apps currently in Tomcat:

```javascript
manager.getApps().then(function(list) {
	//this will print all apps in the server
	list.forEach(function(st) {
		console.log(st);
	})


});
```

To undeploy an app:

```javascript
manager.undeploy("appNameToUndeploy").then(function(applicationName) {
	console.log(applicationName + " has been undeployed!");
}, function(err) {
	console.log("error undeploying app: " + err);
})

```

License
-------
GPL
