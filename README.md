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

Building
--------

tomcatjs is developed in TypeScript, which compiles to JavaScript to be able to publish it as a npm module. In order to build tomcatjs, clone the repository and then install the following global dependencies:

```bash
npm install gulp -g
npm install typescript -g
npm install tsd -g
```
Once you have the above, execute in the repository folder:

```bash
npm install
```
... which will install all the development dependencies. To build the project:

```bash
gulp build
```

This will output the JavaScript npm package to the ./dist folder

License
-------
GPL
