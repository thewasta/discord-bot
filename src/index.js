const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const token = process.env.DISCORD_TOKEN;
const {bot} = require('./Events');

bot.login(token).catch(error => console.log(error));



