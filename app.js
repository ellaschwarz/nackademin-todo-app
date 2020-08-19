
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});