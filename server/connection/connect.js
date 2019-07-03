const mysql = require('mysql')
//local mysql db connection

//UPDATE MYSQL DETAILS HERE
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'makeadiff_madapp'
});

connection.connect(function(err) {
    if (err) throw err;
    
});

module.exports = connection;
