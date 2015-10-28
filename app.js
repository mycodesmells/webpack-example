"use strict";
let express = require('express');
let app = express();
app.set('view engine', 'jade');
app.set('view cache', false);
app.use('/public', express.static('./public'));

app.get('/', (req, res) => {
    res.render('index')
});

var Person = require('./models/Person');
app.get('/person', (req, res) => {
    let personData = {firstName: 'Adam', lastName: 'Smith', age: 23};

    var p = new Person(personData);
    console.warn("=== ON SERVER SIDE ===");
    console.log(p.getFullName());
    console.log(p.isAdult());
    console.log("======================");

    res.json(personData);
});

app.listen(8000);
