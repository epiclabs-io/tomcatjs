import tman = require("../index");

var hostName:string = "localhost"
var userName:string ="manager";
var password:string="manager";
var port:number = 8080;

var manager = new tman.tomcatjs.Manager(hostName,port,userName,password);

manager.getApps().then(function(list:string[])
{
	list.forEach(function(st:string)
	{
		console.log(st);
	})
	
	
});


