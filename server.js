const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//routes
app.get('/', (req, res) => {err
    res.json({"message": "Welcome to the world of node."});
});

//Require Notes routes
require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});