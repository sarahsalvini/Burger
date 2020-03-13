const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./controllers/burgers_controller.js')

var PORT = process.env.PORT || 8080;

var app = express();

// SERVE STATIC CONTENT FOR APP FROM "public" DIRECTORY
app.use(express.static('public'));

// PARSE APP BODY AS JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// SET HANDLEBARS
app.engine('handlebars',handlebars({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');

// GIVE THE SERVER ACCESS TO ROUTES
app.use(routes);

// START SERVER
app.listen(PORT,()=>{
    console.log(`SERVER LISTENING ON: http://localhost:${PORT}`);
});