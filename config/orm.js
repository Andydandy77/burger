var connection = require("./connection");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    
    return arr.toString();
}


function objToSql(ob) {
    console.log(ob);
    var arr = [];

    for(var key in ob){
        var value = ob[key];

        if(Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

           

            arr.push(key + "=" + value);

        }
    }
    return arr;
}
var orm = {

    // Takes in the table name and displays all columns from all rows  
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })


    },

    // Takes in the table name, the columns and their values, and the callback function
    // to burger.js
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table + "(" + cols.toString() + ")"; 
        queryString += " VALUES (";

        queryString += printQuestionMarks(vals.length) + ")";
        
        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });


    },

    // Takes in an object value pair and a condition which will be the id
    // of the chosen burger, and then updates the table in the burgers_db
    updateOne: function(table, objColVals, condition, cb) {
        console.log(objColVals)
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        //console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    }
}

module.exports = orm;