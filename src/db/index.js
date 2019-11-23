const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb://localhost:27017/discord", {useNewUrlParser: true})
    .then(_ => console.log('DB connected'))
    .catch(error => console.log(error));