var fs = require('fs');
var http = require('http');

var lifx = require('./lifx-csgo');

var lights = [];
var bombTime = null;
var currentStatus = '';
var lastBlinkTime = null;
var blinkOn = true;
var lastStrobeTime = null;
var currentStrobeLight = 1
var previousStrobeLight = null;
var bombDidRun = false;


setInterval(checkBombStatus, 250);

function checkBombStatus() {
  fs.readFile('bomb_status', 'utf8', function(err, bombStatus) {
    if (err) throw err;

    if (bombStatus === 'planted') {
      console.log('bomb planted!');
      if (bombDidRun == false) { 
        lifx.daBomb(45000, 1000, 200, .975);
        bombDidRun = true;
      }
      if (currentStatus !== 'planted') {
        currentStatus = 'planted';
        }

    } else if (bombStatus === 'exploded' && currentStatus !== 'exploded') {
        console.log('bomb exploded!');
        currentStatus = 'exploded';
        bombDidRun = false
    } else if (bombStatus === 'defused' && currentStatus !== 'defused') {
        currentStatus = 'defused';
        bombDidRun = false;
    } else if (bombStatus === '' && currentStatus !== '') { //if all fails, reinitialize
        console.log('no bomb status!');
        currentStatus = '';
        bombTime = null;
        lastBlinkTime = null;
        lastStrobeTime = null;
    }
  });
}