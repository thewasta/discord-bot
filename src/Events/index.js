const {Client} = require('discord.js');
const bot = new Client({disableEveryone: true});
const {onMessage, onMessageDelete, onMessageEdit} = require('./MessagesEvents');
const {onGuildMemberAdd, onGuildMemberRemove, onGuildMemberUpdate} = require('./GuildEvents');
const {onDisconnect, onError, onReady, onReconnecting} = require('./BotStatus');
const {onChannelCreate} = require('./ChannelEvents');


// Bot Status Events
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

module.exports.bot = bot;