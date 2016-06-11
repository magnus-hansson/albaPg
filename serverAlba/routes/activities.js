var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


/*
Post
Vad ska hända då?
ett userId och ett ActivityId ska skickas in i databasen.
ett socket meddelande ska skickas

*/

///api/v1/activities
router.get('/', function (req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    // SQL Query > Select Data
    var query = client.query("select 	id,name,location,numberofpersons,datum,datum2,beskrivning,starttime,endtime,(datum2 || ' ' || starttime) AS start,(datum2 || ' ' || endtime) AS end, (select  count(*) from GymnastActivity where ActivityId = a.Id) functionaries from Activities a ORDER BY datum asc	");

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function () {
      done();
      console.log('im in route activities');
      return res.json(results);
    });

  });

});
module.exports = router;