const express = require("express");
const cors = require("cors")
const app = express();
const bodyParser = require('body-parser')
const db = require('./services/database')

var jsonParser = bodyParser.json({limit:1024*1024*10, type:'application/json'}); 
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*10,type:'application/x-www-form-urlencoded' });

app.use(jsonParser);
app.use(urlencodedParser);


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
    db.select_('accounts', {}, {}, (result) => {
        console.log(result)
    })
    res.send(JSON.stringify({ status: true }))
});

app.post('/', (req, res) => {
  res.send(JSON.stringify({ status: true }))
});

module.exports = {
  path: '/api',
  handler: app
}