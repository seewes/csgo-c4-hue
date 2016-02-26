var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var app = express();

app.use(bodyParser.json()); // for parsing application/json

app.post('/', function(req, res) {
  fs.readFile('bomb_status', 'utf8', function(err, bombStatus) {
    var round = 'round' in req.body ? req.body.round : null;
    if (round && round.bomb !== bombStatus) {
      var newBombStatus = req.body.round.bomb;
      if (!newBombStatus) {
        newBombStatus = '';
      }
      fs.writeFile('bomb_status', newBombStatus);
      console.log(newBombStatus);
    }
  });
});

var PORT = 8080;
var HOST = '0.0.0.0';
app.listen(PORT, HOST);
console.log('Server is running on ' + HOST + ':' + PORT);
