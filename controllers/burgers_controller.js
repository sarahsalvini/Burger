const express = require('express');
const router = express.Router();
const burger = require("../models/burger.js");




// CREATE ALL OUR ROUTES AND SETUP LOGIC WITHIN THOSE ROUTES
router.get("/",(request,response)=>{
    // SELECT ALL RECORDS FROM BURGERS TABLE TO USE FOR HANDLEBARS OBJECT
    burger.selectAll((data)=>{
        var handlebarsObject = {
            burgers: data
        };
        response.render('index',handlebarsObject);
    })
});


router.post('/api/burgers',(request,response)=>{
    burger.insertOne(['burger_name','devoured'],
    [request.body.burger_name, request.body.devoured], (result)=>{
        response.json({
            id: result.insertId
        });
    });
});

router.put("/api/burgers/:id",(request,response)=>{
    var condition = `ID = ${request.params.id}`;
    var newDevouredState = request.body.devoured;
    if(newDevouredState === 'true'){
        newDevouredState = 0
    } else {
        newDevouredState = 1
    }
    
    burger.updateOne({
        devoured: newDevouredState
    },
    condition,
    (result)=>{
        if(result.changedRows === 0){
            return response.status(404).end();
        };
        
        response.status(200).end();
    });
});

// EXPORT ROUTES FOR 'server.js'
module.exports = router;