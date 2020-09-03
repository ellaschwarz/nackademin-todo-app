const app = require('./app');

const port = process.env.PORT || 3000;

//Listening on port
app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});