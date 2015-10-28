var reqwest = require('reqwest');

function fetchData(callback) {
    reqwest({
        url: '/person',
        method: 'get',
        dataType: 'json',
        success: function(personData){
            callback(null, personData);
        },
        error: callback
    });
}

module.exports = fetchData;