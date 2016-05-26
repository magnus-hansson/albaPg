var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://db:Founders77@localhost:5432/todo';

var client = new pg.Client(connectionString); 
client.connect();
var query = client.query('CREATE TABLE gymnastActivity(id SERIAL PRIMARY KEY, gymnastId bigint, activityId bigint, added date not null default CURRENT_TIMESTAMP)');


query.on('end', function () { client.end(); });