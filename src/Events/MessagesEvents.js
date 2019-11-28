const {stopBotToRead} = require('../functions/HelpersFunctions');
const {userInformation, purgeMessages, muteUser, unMuteUser, joinChannel} = require('../functions/CommandsFunctions');
const prefix = process.env.PREFIX;

module.exports = {
    onMessage: (message) => {
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
            if (command === `${prefix}join`) {
                joinChannel(message, args[0]);
            }
            message.delete();
        }
    },

    onMessageDelete: (message) => {
        console.log('message deleted');
    },

    onMessageEdit: (oldMessage, newMessage) => {
    }
};