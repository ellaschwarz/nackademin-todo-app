
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Importing route
const todoRoutes = require('./routes/todo-routes');
app.use('/', todoRoutes);

//Listening on port
app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});

