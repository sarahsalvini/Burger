var connection = require("./connection.js");


function printQuestionMarks(valuesLength){
    var arr = [];
    for(var i = 0; i < valuesLength; i++){
        arr.push('?');
    };
    return arr.toString();
};

// USED TO GET JSON TO STRING FOR UPDATE SQL QUERY
function objectToSQL(object){
    var arr = [];

    for (var key in object){
        var value = object[key];

        // CHECK FOR STRING TYPE AND IN ARRAY ABOVE TO SKIP HIDDEN PROPERTIES
        if(Object.hasOwnProperty.call(object,key)){
            if(typeof value === 'string' && value.indexOf(' ') >= 0){
                value = `'${value}'`;
            };
            
            // PUSH KEY:VALUE PAIR TO ARRAY
            arr.push(`${key}=${value}`);
        };
    };
    
    // RETURN FOR UPDATE QUERY
    return arr.toString();
};



var orm = {
    // SELECT ALL FROM DB
    selectAll: (tableInput, callback)=>{
        // DECLARING QUERY FOR SQL
        var queryString = `SELECT * FROM ${tableInput};`;
        // ESTABLISHING CONNECTION AND RUNNING QUERY ABOVE TO RUN CALLBACK FUNCTION
        connection.query(queryString,function(error,result){
            if(error) throw (error);
            callback(result);
        });
    },
    // CREATE A NEW RECORD IN DB
    insertOne: (table,columns,values,callback)=>{
        // DECLARING QUERY FOR INSERT SQL
        var queryString = `INSERT INTO ${table} (${columns.toString()}) VALUES (${printQuestionMarks(values.length)})`;
        // ESTABLISHING CONNECTION AND RUNNING QUERY ABOVE TO RUN CALLBACK FUNCTION
        connection.query(queryString,values,(error,result)=>{
            if(error) throw(error);
            callback(result);
        })
    },
    updateOne: (table, objectColumnValues, condition, callback)=>{
        // DECLARING QUERY FOR UPDATE SQL
        var queryString = `UPDATE ${table} SET ${objectToSQL(objectColumnValues)} WHERE ${condition};`;
        // ESTABLISHING CONNECTION AND RUNNING QUERY ABOVE TO RUN CALLBACK FUNCTION
        connection.query(queryString,(error,result)=>{
            if(error) throw (error);
            callback(result);
        });
    }
};


  module.exports = orm;
  