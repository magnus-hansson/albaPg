var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connectionString = require(path.join(__dirname, 'config'));
var pg = require('pg');
var routes = require('./routes/index');
var users = require('./routes/users');
var activities = require('./routes/activities');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = express.Router();
var db = require('./queries');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//dsad
io.sockets.on('connection', function (socket) {
  console.log('sockets connection');
});

//api endpoints with socket io


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

require('./api')(app,io); 
// app.use('/', routes);
// app.use('/users', users);
 app.use('/api/v1/activities', activities);

//app.post('/api/signup', db.signup);
 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var port = process.env.PORT || 3001;
// Listen for connections
http.listen(port);
// Log port
console.log('Server listening on port ' + port);

module.exports = app;






















/*app.post('/api/v1/signupWitoutPromise', function (req, res) {

  var results = [];

  // Grab data from http request
  var gymnastId = req.body.gymnastId;
  var activityId = req.body.activityId;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    // SQL Query > Insert Data
    client.query("delete from gymnastActivity where gymnastid=$1", [gymnastId]);
    client.query("INSERT INTO GymnastActivity (gymnastid, activityid) values($1, $2)", [gymnastId, activityId]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM GymnastActivity where gymnastid=$1 ORDER BY id desc",[gymnastId]);

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function () {
      io.emit('inserted', { 'added': activityId, 'removed': 0 });
      done();
      return res.json(results);
    });
  });
});
*/
/*app.post('/api/v1/testX', (req, res) => {
  var gymnastId = req.body.gymnastId;
  var activityId = req.body.activityId;
  var results = [];
  var existingActivities = [];
  pg.connect(connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

    
    var query = client.query("select id from GymnastActivity where gymnastid=$1 ", [gymnastId]);


    query.on('row', function (row) {
      console.log(row);
      results.push(row);
    });
    
    query.on('end', function (result) {
      console.log(result.rowCount);
      done();
      return res.json(result.rowCount);
    });
  });
});
*/
/*
app.post('/api/v1/signupOLD', (req, res) => {
  var gymnastId = req.body.gymnastId;
  var activityId = req.body.activityId;
  var results = [];
  pg.connect(connectionString, function (err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }

 
    var existing = client.query("select * from GymnastActivity where gymnastid=$1", [gymnastId]);

    // SQL Query > Select Data
    client.query("INSERT INTO GymnastActivity (gymnastid, activityid) values($1, $2)", [gymnastId, activityId]);
    var query = client.query("SELECT * FROM GymnastActivity ORDER BY id desc LIMIT 1");
    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function () {
      console.log('signed up gymnast with id', gymnastId, 'to event with id', activityId);
      io.emit('inserted', { 'added': activityId, 'removed': 0 });
      done();
      return res.json(results);
    });
  });
});
*/