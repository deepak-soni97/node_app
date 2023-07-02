const express =  require('express');
const PORT = process.env.PORT || 3030;
const connectDB = require('./db/conn');
const bodyParser = require('body-parser');
const user  = require('./src/routes/user');

// create a new Express app instance
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connectDB();

app.use('/', user);

app.listen(PORT,() => {
    console.log(`server started on port ${PORT}`);
})