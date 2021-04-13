const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/finsta_project', {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));