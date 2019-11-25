const {userInformation, purgeMessages, muteUser, unMuteUser} = require('../functions/CommandsFunctions');
const {stopBotToRead} = require('../functions/HelpersFunctions');
const prefix = process.env.PREFIX;

module.exports = {
    onReconnecting: () => {
        console.log('I loose connection, have to refresh the connection');
    },
    onError: (error) => {
        console.log(error);
    },
    onReady: async () => {
        console.log('I\'m ready');
    },
    onMessage: async (message) => {
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
    },
    onDisconnect: () => {
        console.log('Good Bye, Have a good day!');
    },
    onGuildMemberAdd: (member) => {
        const channel = member.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        channel.send(`${member.user.createdAt} ${member.user.tag}joined to server`);
    },
    onGuildMemberRemove: () => {

    },
    onGuildMemberUpdate: () => {

    },
    onMessageDelete: () => {

    }
};