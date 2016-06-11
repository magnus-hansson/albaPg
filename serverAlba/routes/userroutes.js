var express = require('express');
var router = express.Router();
var pg = require('pg');
var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://db:Founders77@localhost:5432/todo';
var db = pgp(connectionString);



router.get('/api/v1/user/:id', (req, res) => {
    var results = [];
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        var userid = req.params.id;
        if (userid == "undefined"){
            userid = 1;
        } 
        console.log(userid);
        
        /*
        var query = client.query("select * from gymnast where guuid=$1", [req.params.id]);
        query.on('row', function (row) {
            results.push(row);
        });
        */
         var query = client.query("select * from gymnast where id=$1", [userid]);

         query.on('row', function (row) {
             results.push(row);
         });
        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            console.log('im in get user');
            return res.json(results[0]);
        });

    });

});

module.exports = router;