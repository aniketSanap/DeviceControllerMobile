var Server = require('ws').Server;
var robot = require('robotjs');
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
var movement_deltax = 1;
var movement_deltay = 1;
var res;
ws.on('connection', function(w){
	console.log("new connection");
    w.on('message', function(msg){
	    res = msg.split(" ");
	    dx = parseFloat(res[2]);
	    dy = parseFloat(res[3]);
		console.log(dx,dy);
		if(dx< 0)
		{
			x = x + movement_deltax;
		}
		else if(dx > 0)
		{
			x = x - movement_deltax;
		}				
		if(dy>0)
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



