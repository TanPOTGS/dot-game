//require mongoose
const mongoose = require('mongoose');

//DATABASE_URL is the first variable in the .env file
mongoose.connect(process.env.DATABASE_URL, {reconnectInterval: 500, useNewUrlParser: true});

//database connection event
mongoose.connection.on('connected', function() {
  console.log('Whoa, check it out! You just connected to your database!');
});

//export the module
module.exports = mongoose;