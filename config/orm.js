var connection = require("./connection.js");

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
  