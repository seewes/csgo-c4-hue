var lifx = require('./lifx');
var util = require('util');
var packet = require('./packet');


var lx = lifx.init();

lx.on('bulbstate', function(b) {
	//console.log('Bulb state: ' + util.inspect(b));
});

lx.on('bulbonoff', function(b) {
	//console.log('Bulb on/off: ' + util.inspect(b));
});

lx.on('bulb', function(b) {
	console.log('New bulb found: ' + b.name + " : " + b.addr.toString("hex"));
});

lx.on('gateway', function(g) {
	console.log('New gateway found: ' + g.ip);
});

lx.on('packet', function(p) {
	// Show informational packets
	switch (p.packetTypeShortName) {
		case 'powerState':
		case 'wifiInfo':
		case 'wifiFirmwareState':
		case 'wifiState':
		case 'accessPoint':
		case 'bulbLabel':
		case 'tags':
		case 'tagLabels':
		//case 'lightStatus':
		case 'timeState':
		case 'resetSwitchState':
		case 'meshInfo':
		case 'meshFirmware':
		case 'versionState':
		case 'infoState':
		case 'mcuRailVoltage':
			console.log(p.packetTypeName + " - " + p.preamble.bulbAddress.toString('hex') + " - " + util.inspect(p.payload));
			break;
		default:
			break;
	}
});
console.log("-----------------------------------------");
console.log("Keys:");
console.log("Press 1 to test Bomb Plant Script");
console.log("Press 5 to turn the lights a bright white");
console.log("Press Ctrl + C to close");
console.log("-----------------------------------------");


var stdin = process.openStdin();
process.stdin.setRawMode(true);
process.stdin.resume();

var cycledColour = 0;

function setBrightRed() {
	lx.lightsColour(0x0000, 0xffff, 0x8000, 200, 250);
	lx.lightsColour(0x0000, 0xffff, 0x8000, 200, 250);
}

function setBrightOrange() {
	lx.lightsColour(0x11ff, 0xffff, 0xffff, 0, 0);
	lx.lightsColour(0x11ff, 0xffff, 0xffff, 0, 0);
}

function setDimRed()    {
	lx.lightsColour(0x0000, 0xffff, 1000, 200, 100);
	lx.lightsColour(0x0000, 0xffff, 1000, 200, 100);
}

function setBrightWhite()    {
	lx.lightsColour(0x0000, 0x0000, 0x8000, 0x0af0, 1);
	lx.lightsColour(0x0000, 0x0000, 0x8000, 0x0af0, 1);
	console.log("Bright White has Fired");
}

function setDefault()    {
	lx.lightsColour(0x0000, 0x0000, 0x2666, 0x0C80, 1000);
	lx.lightsColour(0x0000, 0x0000, 0x2666, 0x0C80, 1000);
	console.log("Default Restored");
}

function setOffSlowly()    {
	lx.lightsColour(0x0000, 0x0000, 0x0000, 0x0C80, 1000);
	lx.lightsColour(0x0000, 0x0000, 0x0000, 0x0C80, 1000);
	console.log("Light Set to Off");
}

function blinkCycle() {
	setTimeout(function() {setBrightRed(); }, 1);
	setTimeout(function() {setDimRed(); }, 250);
}

function clearBombLogic() {
	clearInterval(bombTickRate);
	console.log("bombLogic Cleared");
}


function daBomb(duration, maxInterval, minInterval, coefficient) {

		bombTickRate = setInterval(bombLogic, 100);
		var startTime = Date.now();
		var offset = maxInterval;
		var lastBlinkTime = null;
		var nextBlinkTime = null;
		var lastIdleLog = Date.now();

	function bombLogic () {

		//confirm bomb is planted
		if (Date.now() > startTime + duration) {
				clearInterval(bombTickRate);
				console.log("End Bomb Sequence")
		} else if (nextBlinkTime === null) {
				nextBlinkTime = Date.now();
				lastBlinkTime = Date.now();
		} else if (nextBlinkTime < Date.now() && Date.now() < startTime + duration - 8000) {
			blinkCycle(); //Do a blink cycle
			console.log("Blink Cycle");
			lastBlinkTime = Date.now();
			offset *= coefficient;
			nextBlinkTime = lastBlinkTime + offset + minInterval;
			console.log("Idle:" + ( ( (nextBlinkTime - lastBlinkTime) ) / 1000 ).toFixed(2));
		} else {
			if (lastIdleLog < (Date.now() + 1000)) {
			}
		}

		//Countdown till Explosion (Assumes 40 seconds)
		if( (Date.now() - startTime) >  5000 && (Date.now() - startTime) <  5100) { console.log("-----------------------35")} else
		if( (Date.now() - startTime) > 10000 && (Date.now() - startTime) < 10100) { console.log("-----------------------30")} else
		if( (Date.now() - startTime) > 15000 && (Date.now() - startTime) < 15100) { console.log("-----------------------25")} else
		if( (Date.now() - startTime) > 20000 && (Date.now() - startTime) < 20100) { console.log("-----------------------20")} else
		if( (Date.now() - startTime) > 25000 && (Date.now() - startTime) < 25100) { console.log("-----------------------15")} else
		if( (Date.now() - startTime) > 30000 && (Date.now() - startTime) < 30100) { console.log("-----------------------10")} else
		if( (Date.now() - startTime) > 35000 && (Date.now() - startTime) < 35100) { console.log("------------------------5")} else
		if( (Date.now() - startTime) > 36000 && (Date.now() - startTime) < 36100) { console.log("------------------------4")} else
		if( (Date.now() - startTime) > 37000 && (Date.now() - startTime) < 37100) { console.log("------------------------3")} else
		if( (Date.now() - startTime) > 38000 && (Date.now() - startTime) < 38100) { console.log("------------------------2")} else
		if( (Date.now() - startTime) > 39000 && (Date.now() - startTime) < 39100) { console.log("------------------------1")} else
		if( (Date.now() - startTime) > 40000 && (Date.now() - startTime) < 40100) { console.log("------------------------BOOM!")}

		//Special End Events
		if( (Date.now() - startTime) > 37500 && (Date.now() - startTime) < 37600) { setBrightWhite(); } else
		if( (Date.now() - startTime) > 39000 && (Date.now() - startTime) < 39100) { setOffSlowly();   } else
		if( (Date.now() - startTime) > 40000 && (Date.now() - startTime) < 40100) { setBrightOrange();} else
		if( (Date.now() - startTime) > 40250 && (Date.now() - startTime) < 40350) { setBrightRed();   } else
		if( (Date.now() - startTime) > 40500 && (Date.now() - startTime) < 40600) { setBrightOrange();} else
		if( (Date.now() - startTime) > 40750 && (Date.now() - startTime) < 40850) { setDimRed();      } else
		if( (Date.now() - startTime) > 41000 && (Date.now() - startTime) < 41100) { setBrightOrange();} else
		if( (Date.now() - startTime) > 41250 && (Date.now() - startTime) < 41350) { setOffSlowly();   } else
		if( (Date.now() - startTime) > 44000 && (Date.now() - startTime) < 44100) { setDefault();     }

	}

}




stdin.on('data', function (key) {
	//process.stdout.write('Got key ' + util.inspect(key) + '\n');
	switch (key[0]) {

		//lx.lightsColour(hue, saturation, luminance, whiteColour, fadeTime, bulb);
		case 0x31: // 1
			console.log("Bomb Timer");

				daBomb(45000, 1000, 200, .975);

			break;

		case 0x35: // 5
			// console.log("Bright white");
			// lx.lightsColour(0x0000, 0x0000, 0x8000, 0x0af0, 0x0513);
			// break;

			//blinkCycle();

			clearBombLogic();
			setDefault();

			break;

		case 0x03: // ctrl-c
			console.log("Closing...");
			lx.close();
			process.stdin.pause();
			//process.exit();
			break;

	}
});

function logHelloWorld() {
	console.log("HelloWorld");
}

//Export functions
module.exports.daBomb = daBomb;



