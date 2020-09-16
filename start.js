const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;

//Listening on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});