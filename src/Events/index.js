const {Client} = require('discord.js');
const bot = new Client({disableEveryone: true});
const {onMessage} = require('./MessagesEvents');
const {onGuildMemberAdd} = require('./GuildEvents');
const {onDisconnect, onError, onReady, onReconnecting} = require('./BotStatus');
const {onChannelCreate} = require('./ChannelEvents');


// Bot Status Events
bot.on('error', onError);
bot.on('reconnecting', onReconnecting);

bot.on('ready', onReady.bind(this, () => {
    const chanel = bot.channels.get('645235725549174817');
    chanel.send('I\'m ready to make your life more simple');
}));

bot.on('disconnect', onDisconnect);

//Messages Events
bot.on('message', onMessage);

//Channel Events
bot.on('channelCreate', onChannelCreate.bind(this, (channel) => {
    const logsChannel = bot.channels.find(ch => ch.id === '648546487646552107');
    console.log(channel.client);
    // logsChannel.send();
}));

//Guild Events
bot.on('guildMemberAdd', onGuildMemberAdd.bind(this, (channel, member) => {
    channel.send(`${member.user.createdAt} ${member.user.tag}joined to server`);
}));

module.exports.bot = bot;