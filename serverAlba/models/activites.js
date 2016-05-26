var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://db:Founders77@localhost:5432/todo';

var client = new pg.Client(connectionString); 
client.connect();
var query = client.query('CREATE TABLE activites(id SERIAL PRIMARY KEY, eventId bigint, name VARCHAR(50) not null, numberOfPersons bigint, date timestamp default NULL, startTime VARCHAR(10), endTime VARCHAR(10))');


query.on('end', function () { client.end(); });