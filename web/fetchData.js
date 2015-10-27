var reqwest = require('reqwest');

function fetchData(callback) {
    reqwest({
        url: '/person',
        method: 'get',
        dataType: 'json',
        success: (personData) => {
            callback(null, personData);
        },
        error: callback
    });
}

module.exports = fetchData;