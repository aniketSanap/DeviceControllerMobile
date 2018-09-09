var Server = require('ws').Server;
var robot;
if(require('os').userInfo().username == "aniket") {	// Just for Aniket I know this is pretty bad practice but it is temporary.
	robot = require('./robotjs');
} else {
	robot = require('robotjs');
}
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

var movement_deltax = 3;
var movement_deltay = 3;

var res;
ws.on('connection', function(w){
	console.log("new connection");
    w.on('message', function(msg){
	    res = msg.split(" ");
	    dx = parseFloat(res[2]);
	    dy = parseFloat(res[3]);

		console.log(x,y);
		if(dx > -1 && dx < 1 ) {
			//do nothing
		} 
		// else { 	// Returns NaN
		// 	x = x + dx;
		// }
		else if(dx< 0)
		{
			x = x + movement_deltax;
		}
		else if(dx > 0)
		{
			x = x - movement_deltax;
		}
		if (dy > -1 && dy < 1) {
			//do nothing
		} 
		// else {
		// 	y = y + dy;
		// }				
		else if(dy>0)
		{
			y = y + movement_deltay;
		}
		else if(dy<0)
		{
			y = y - movement_deltay;
		}

    //Clip values

		if(y > screenSize.height)
		{
			y = screenSize.height;
		}
		else if( y < 0)
		{
			y = 0;
		}
		if(x > screenSize.width)
		{
			x = screenSize.width;
		}
		else if( x < 0)
		{
			x = 0;
		}	
		robot.moveMouseSmooth(x, y);
	});
	w.on('close', function() {
	  console.log('closing connection');
	});
});
