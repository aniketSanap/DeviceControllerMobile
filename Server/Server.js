var Server = require('ws').Server;
var robot = require('./robotjs.node');
var port = process.env.PORT || 9030;
var ws = new Server({port: port});
console.log("Running");
robot.setMouseDelay(0); 
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;
var dx;
var dy;
var x = 0.0;
var y = 0.0;
var movement_deltax = width/200;
var movement_deltay = height/200;
var res;
ws.on('connection', function(w){
	console.log("new connection");
    w.on('message', function(msg){
	    res = msg.split(" ");
	    dx = parseFloat(res[0]);
	    dy = parseFloat(res[1]);
		console.log(dx,dy);
		if(dx < 1.00) {
			if(x >= width)
				x = width;
			else
				x = x + movement_deltax;
		} else if(dx > 1.00) {
			if(x <= 0)
				x = 0;
			else 
				x = x - movement_deltax;
		} else {
			
		}
		if(dy < 1) {
			if(y >= height)
				y = height;
			else 
				y = y + movement_deltay;
		} else if(dy > 1) {
			if(y <= 0)
				y = 0;
			else
				y = y - movement_deltay;
		} else {
			
		}
		// if(isNaN(x)) { x = 0; }
		// if(isNaN(y)) { y = 0; }
		robot.moveMouseSmooth(x, y);
	});
	w.on('close', function() {
	  console.log('closing connection');
	});
});





//Works for whatever reason: 

// var Server = require('ws').Server;
// var robot = require('./robotjs.node');
// var port = process.env.PORT || 9030;
// var ws = new Server({port: port});
// console.log("Running");
// robot.setMouseDelay(2); 
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;
// var dx = 0;
// var dy = 0;
// var x = 0;
// var y = 0;
// var res;
// ws.on('connection', function(w){
// 	console.log("new connection");
//     w.on('message', function(msg){
// 	    // console.log('message from client');
// 	    res = msg.split(" ");
// 	    dx = parseFloat(res[0]);
// 	    dy = parseFloat(res[1]);
// 		x = parseFloat(dx);
// 		y = parseFloat(dy);
// 		robot.moveMouse(x, y);
// 	});
// 	w.on('close', function() {
// 	  console.log('closing connection');
// 	});
// });


// var Server = require('ws').Server;
// var robot = require('./robotjs.node');
// var port = process.env.PORT || 9030;
// var ws = new Server({port: port});
// console.log("Running");
// robot.setMouseDelay(2); 
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;
// var dx;
// var dy;
// var x = 0;
// var y = 0;
// var res;
// ws.on('connection', function(w){
// 	console.log("new connection");
//     w.on('message', function(msg){
// 	    res = msg.split(" ");
// 	    dx = parseFloat(res[0]);
// 	    dy = parseFloat(res[1]);
// 		x = x + parseFloat(dx);
// 		y = y + parseFloat(dy);
// 		robot.moveMouse(x, y);
// 	});
// 	w.on('close', function() {
// 	  console.log('closing connection');
// 	});
// });



/*

Works for whatever reason: 

var Server = require('ws').Server;
var robot = require('./robotjs.node');
var port = process.env.PORT || 9030;
var ws = new Server({port: port});
console.log("Running");
robot.setMouseDelay(2); 
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;
var dx = 0;
var dy = 0;
var x = 0;
var y = 0;
var res;
ws.on('connection', function(w){
	console.log("new connection");
    w.on('message', function(msg){
	    // console.log('message from client');
	    res = msg.split(" ");
	    dx = parseFloat(res[0]);
	    dy = parseFloat(res[1]);
		x = parseFloat(dx);
		y = parseFloat(dy);
		robot.moveMouse(x, y);
	});
	w.on('close', function() {
	  console.log('closing connection');
	});
});

*/