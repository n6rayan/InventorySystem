const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({
        "status": 200,
        "message": "OK!"
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000.\nGo to http://127.0.0.1:3000 to see the health check.");
});
