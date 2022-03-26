const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/bti425-a3-nathan-kenopic'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/bti425-a3-nathan-kenopic/index.html'));});
app.listen(process.env.PORT || 8080);