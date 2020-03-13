var orm = require("../config/orm.js");

// SETUP BURGER MODEL FOR ORM
var burger = {
    selectAll: (callback)=>{
        orm.selectAll('burgers',(response)=>{
            callback(response);
        })
    },
    // COLUMNS AND VALUES ARE TYPE OF ARRAY
    insertOne: (columns,values,callback)=>{
        orm.insertOne('burgers',columns,values,(response=>{
            callback(response);
        }));
    },
    updateOne: (objectColumnValues,condition,callback)=>{
        orm.updateOne('burgers',objectColumnValues,condition,(response)=>{
            callback(response);
        });
    }
};

// EXPORT DB FUNCTIONS FOR CONTROLLER (burgers_controller.js)
module.exports = burger;