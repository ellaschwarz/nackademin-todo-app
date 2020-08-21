
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/view'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

//Importing route
const todoRoutes = require('./routes/todo-routes');
app.use('/todo', todoRoutes);

//Listening on port
app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});

