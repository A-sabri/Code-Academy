const express = require('express');
require('dotenv').config({path: './config/.env'})
require('./config/db.js');
const userRoutes = require('./routes/user.routes.js');
const courseRoutes = require('./routes/course.routes.js');
const path = require('path');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error);
});

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Server
app.listen(process.env.PORT , () => {
    console.log(`listening on port ${process.env.PORT}`);
});