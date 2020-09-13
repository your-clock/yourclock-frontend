const express = require('express');
const app = express();
var http = require('http').createServer(app)
const cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))     //application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'dist')));

app.set('puerto', process.env.PORT || 8080);

http.listen(app.get('puerto'), function () {
    console.log('App listening on port: '+ app.get('puerto')+' In environment: '+process.env.NODE_ENV);
});