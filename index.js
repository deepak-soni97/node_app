const express =  require('express');
const PORT = 3000;
const connection = require('./db/conn');
const bodyParser = require('body-parser');
const user  = require('./src/routes/user');

// create a new Express app instance
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection();

app.use('/', user);

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`);
})