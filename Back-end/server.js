const express = require('express');
require('dotenv').config({path: './config/.env'})
require('./config/db.js');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error);
});


//Server
app.listen(process.env.PORT , () => {
    console.log(`listening on port ${process.env.PORT}`);
});