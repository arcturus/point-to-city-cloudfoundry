var express = require('express'),
  ptc = require('point-to-city');

var app = express();

app.get('/', function(req, res) {
  var lat = req.query['lat'] || null,
  lon = req.query['lon'] || null;
  if (!lat || !lon) {
    res.send('Missing required parameters lat,lon');
	return;
  }

  var query = ptc.init('[yourappidhere]');
  var method = query.point_to_city;
  if (req.query['full']) {
    method = query.yahoo_where;
  }

  method.call(this, lat, lon, function(result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(result));
  },
  function(error) {
    res.send('Error : ' + JSON.stringify(error));
  });
});

app.listen(3000);
