const path = require('path');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const {userInformation, purgeMessages, muteUser, unMuteUser} = require('./functions/CommandsFunctions');
const {stopBotToRead} = require('./functions/HelpersFunctions');
const prefix = process.env.PREFIX;

bot.on('error', error => console.log(`ERROR FOUND DISCORD \n ${error.stack}`));

bot.on('ready', () => {
    console.log('Bot is ready!');
});

bot.on('message', async message => {
    if (stopBotToRead(message)) {
        const receivedMessage = message.content.toLowerCase();
        let messageArray = receivedMessage.split(' ');
        const command = messageArray[0];
        let args = messageArray.slice(1);
        if (command === `${prefix}userinfo`) {
            message.channel.send(userInformation(message));
        }

        if (command === `${prefix}purge`) {
            message.channel.send(purgeMessages(message, args[0]));
        }

        if (command === `${prefix}mute`) {
            message.channel.send(muteUser(message));
        }

        if (command === `${prefix}unmute`) {
            message.channel.send(unMuteUser(message));
        }
    }
});

bot.login(process.env.DISCORD_TOKEN).catch(console.log);