const {RichEmbed} = require('discord.js');
const {checkPermissions, authorIsConnectedFrom} = require('./HelpersFunctions');
const CommandsFunctions = {};


function hasArguments(message) {
    const receivedMessage = message.content.toLowerCase();
    let messageArray = receivedMessage.split(' ');
    let args = messageArray.slice(1);
    return Array.isArray(args) && args.length > 0;
}

function createEmbed(args) {
    if (checkPermissions(args, ['ADMIN', 'userinfo'], 'and')) {
        let embed = new RichEmbed();
        embed.setColor('LUMINOUS_VIVID_PINK')
            .setThumbnail(args.author.avatarURL)
            .setAuthor(args.author.username.toUpperCase())
            .addField('Nombre de Usuario', `${args.author.tag}`)
            .addField('ID usuario', args.author.id)
            .addField('Estado Actual', args.author.presence.status)
            .addField('Conectado desde', authorIsConnectedFrom(args.author.presence))
            .addField('Fecha que se unió a Discord', args.author.createdAt)
            .addBlankField()
            .addField('URL de Avatar', args.author.avatarURL);
        return embed;
    } else {
        return 'You have not permissions to use this command';
    }
}

function bulkMessages(args, limit) {
    const fetchLimit = limit !== undefined ? limit : 99;
    if (checkPermissions(args, ['ADMIN', 'userinfo'], 'and')) {
        async function clear() {
            const fetched = await args.channel.fetchMessages({limit: fetchLimit});
            args.channel.bulkDelete(fetched);
        }

        clear();

        return 'Messages deleted';
    } else {
        console.log('else');
        return 'You have not permissions to use this command';
    }
}

CommandsFunctions.createEmbed = createEmbed;
CommandsFunctions.bulkMessages = bulkMessages;

module.exports = CommandsFunctions;