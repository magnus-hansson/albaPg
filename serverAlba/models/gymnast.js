var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://db:Founders77@localhost:5432/todo';

var client = new pg.Client(connectionString); 
client.connect();
var query = client.query('CREATE TABLE gymnast(id SERIAL PRIMARY KEY, groupId bigint, name VARCHAR(50) not null)');


query.on('end', function () { client.end(); });