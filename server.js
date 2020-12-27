const http = require('http');
const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const itemsRouter = require('./routes/items');
const app = express();
app.use(express.json());
//app.use(express.bodyParser());
app.use(cors({origin : 'http://localhost:7070'}));
// app.use('/',function(req,res){
//    res.send("dsfsdg");
//    console.log(typeof res);
// });
app.use('/items',itemsRouter);
app.use('/',function(req,res){
    res.send('node ex api works');
});
const server = http.createServer(app);
const port = 7070;
server.listen(port);

console.debug('Server lstng to 7070');