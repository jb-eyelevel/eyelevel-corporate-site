var express   = require('express');
var app = express();

//Express Logic
var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.listen(port);

console.log("The music is playing on port " + port);

