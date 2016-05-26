var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://db:Founders77@localhost:5432/todo';
var db = pgp(connectionString);

module.exports = function (app, io) {
    app.post('/api/v1/signup', (req, res) => {
        var gid = req.body.gid;
        var aid = req.body.aid;
        var prevIds = null;
      
        db.task(function (t) {
            // this = t = task protocol context;
            // this.ctx = task config + state context;
            return t.any("select activityid from gymnastActivity where gymnastid=$1", gid)
                .then(function (ids) {
                    prevIds = ids;
                    console.log(ids);
                    return t.any("delete from gymnastActivity where gymnastid=$1", gid)
                        .then(function (remopved) {
                            return t.any("INSERT INTO GymnastActivity (gymnastid, activityid) values($1, $2)", [gid, aid]);
                        });
                });
            })
            .then(function (events) {
                io.emit('inserted', { 'add': aid, 'del': prevIds });
                res.status(200)
                    .json({
                        status: events,
                        message: 'Inserted one puppy',
                        old: prevIds
                    });
                // success;
            })
            .catch(function (error) {
                console.log("ERROR:", error.message || error);
            });
    });


    app.post('/api/v3/signupX', (req, res) => {

        var gid = req.body.gid;
        var aid = req.body.aid;
        var prevActIds;
        db.any('select id from gymnastActivity where gymnastid=$1', gid)
            .then(function (data) {
                prevActIds = data;
                //remove all previously signed up activities
                console.log(prevActIds);
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted one puppy',
                        old: prevActIds
                    });
            })

            .catch(function (err) {
                return next(err);
            });


    });

    app.put('/foo', function (req, res) {
        // /* 
        //   do stuff to update the foo resource 
        //   ...
        //  */

        // now broadcast the updated foo..
        console.log("PUT OK!");

        io.sockets.emit('update'); // how?
        res.json({ result: "update sent over IO" });

    });
}