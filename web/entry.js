var Person = require('../models/Person');
var fetchData = require('./fetchData');

fetchData((err, personData) => {
    console.info("=== ON CLIENT SIDE ===");
    var person = new Person(personData);
    console.log(person.getFullName());
    console.log(person.isAdult());
    console.info("======================");
});

