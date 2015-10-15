import tman = require("../index");

var hostName:string = ""
var userName:string ="";
var password:string="";

var manager = new tman.tomcatjs.Manager(hostName,80,userName,password);

manager.getApps();


