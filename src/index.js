const path = require('path');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const {onMessage, onReady, onError, onDisconnect, onGuildMemberAdd, onReconnecting} = require('./Events/Events');

bot.on('reconnecting', onReconnecting);

bot.on('error', onError);

bot.on('ready', onReady);

bot.on('message', onMessage);

bot.on('disconnect', onDisconnect);

bot.on('guildMemberAdd', onGuildMemberAdd);
bot.login(process.env.DISCORD_TOKEN).catch(console.log);