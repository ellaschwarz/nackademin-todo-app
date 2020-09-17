const app = require('./app');
require('dotenv').config();
const Database = require('./db/database');


const port = process.env.PORT || 3000;

//Listening on port
Database.connect().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});