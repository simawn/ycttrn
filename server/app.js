const express = require('express');
const app = express();

const data = require('./db.json');



app.get('/:coords', (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(data));
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));