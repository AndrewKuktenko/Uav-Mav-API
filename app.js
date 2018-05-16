const config = require('./config.json');
const SerialPort = require('serialport');
const mavlink = require('mavlink');

//Open serial port
const port = new SerialPort(`/dev/${config.port}`, {
	baudRate: config.baudrate
});

port.on('open', function() {
	console.log("Serial Port is ready");
	
	//listening for system 1 component 1
	const mav = new mavlink(0,0,config.mavlinkVersion,["common",config.autopilotType]);
	
	//When mavlink is ready, assign some listeners
	mav.on('ready', function() {
		console.log("Mavlink is ready!");
		
		//Parse any new incoming data
		port.on('data', function(data) {
			mav.parse(data);
		});
		
		// Take any message 
		mav.on("message", function(message, fields) {
			 //console.log(message);
		});


		mav.on("HEARTBEAT", function(message, fields) {
			console.log(fields);
		});

		mav.on("SYS_STATUS", function(message, fields) {
			console.log('--SYS_STATUS--');
			console.log(fields);
		});
		
		//Create a few messages and print them to screen
		// m.createMessage("ATTITUDE", {
		// 	'time_boot_ms':	30,
		// 	'roll':			0.1,
		// 	'pitch':		0.2,
		// 	'yaw':			0.3,
		// 	'rollspeed':	0.4,
		// 	'pitchspeed':	0.5,
		// 	'yawspeed':		0.6
		// }, echoMessage);
		
		// m.createMessage("PARAM_VALUE", {
		// 	'param_id':		'MY_PI',
		// 	'param_value':	3.14159,
		// 	'param_type':	5,
		// 	'param_count':	100,
		// 	'param_index':	55
		// }, echoMessage);
		
		// m.createMessage("GPS_STATUS", {
		// 	'satellites_visible':		5,
		// 	'satellite_prn':			[1, 2, 3, 4, 5],
		// 	'satellite_used':			[2, 3, 4, 5, 6],
		// 	'satellite_elevation':		[3, 4, 5, 6, 7],
		// 	'satellite_azimuth':		[4, 5, 6, 7, 8],
		// 	'satellite_snr':			[5, 6, 7, 8, 9]
		// }, echoMessage);
	});
});

const echoMessage = function(message) {
	console.log(message);
}