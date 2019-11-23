const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
require('dotenv').config({path: path.join(__dirname, '..', '.env')});
const {createEmbed, bulkMessages} = require('./functions/CommandsFunctions');
const {stopBotToRead, checkPermissions} = require('./functions/HelpersFunctions');
const prefix = process.env.PREFIX;

client.on('error', error => console.log(`ERROR FOUND DISCORD \n ${error}`));

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async message => {
    if (stopBotToRead(message)) {
        const receivedMessage = message.content.toLowerCase();
        let messageArray = receivedMessage.split(' ');
        const command = messageArray[0];
        let args = messageArray.slice(1);
        if (command === `${prefix}userinfo`) {
            message.channel.send(createEmbed(message));
            return;
        }
        if (command === `${prefix}purge`) {
            message.channel.send(bulkMessages(message, 6));
        }
    }
});

client.login(process.env.DISCORD_TOKEN).catch(console.log);