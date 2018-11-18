var mysql = require("mysql");

var connection;
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
        connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "burgers_db"
    });
    
}
connection.connect(function(err) {
    if (err) {s
        return console.error("error connection: " + err.stack);
        
    } 
    console.log("connected as id " + connection.threadId)
});

// Export connection so ORM can use burgers_db 
module.exports = connection;