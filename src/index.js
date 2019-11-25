const path = require('path');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const token = process.env.DISCORD_TOKEN;
const {onMessage, onMessageDelete, onMessageEdit} = require('./Events/MessagesEvents');
const {onGuildMemberAdd, onGuildMemberRemove, onGuildMemberUpdate} = require('./Events/GuildEvents');
const {onDisconnect, onError, onReady, onReconnecting} = require('./Events/BotStatus');
const {onChannelCreate} = require('./Events/ChannelEvents');

//Bot Status Events
bot.on('error', onError);

bot.on('reconnecting', onReconnecting);

bot.on('ready', onReady);

bot.on('disconnect', onDisconnect);

//Messages Events
bot.on('message', onMessage);

bot.on('messageDelete', onMessageDelete);

bot.on('messageUpdate', onMessageEdit);

//Channel Events
bot.on('channelCreate', onChannelCreate);

//Guild Events
bot.on('guildMemberAdd', onGuildMemberAdd);

bot.on('guildMemberRemove', onGuildMemberRemove);

bot.on('guildMemberUpdate', onGuildMemberUpdate);

bot.login(token).catch(error => console.log(error));