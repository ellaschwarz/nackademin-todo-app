
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

//Middleware
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/view'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

//Importing route
const todoRoutes = require('./routes/todo-routes');
app.use('/todos', todoRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/users', userRoutes);

//Listening on port
app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});

