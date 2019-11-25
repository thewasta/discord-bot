const {RichEmbed} = require('discord.js');
const {checkPermissions, authorIsConnectedFrom} = require('./HelpersFunctions');
const CommandsFunctions = {};


function hasArguments(message) {
    const receivedMessage = message.content.toLowerCase();
    let messageArray = receivedMessage.split(' ');
    let args = messageArray.slice(1);
    return Array.isArray(args) && args.length > 0;
}

function userInformation(args) {
    if (checkPermissions(args, ['ADMIN', 'owner'], 'or')) {

        if (args.mentions.users.first()) {
            let embed = new RichEmbed();
            embed.setColor('RED')
                .setAuthor(args.mentions.users.first().username.toUpperCase())
                .setThumbnail(args.mentions.users.first().avatarURL)
                .addField('Nombre de usuario', args.mentions.users.first().tag)
                .addField('ID usuario', args.mentions.users.first().id)
                .addField('Ping de conexión', args.mentions.users.first().client.pings)
                .addField('Estado Actual', args.mentions.users.first().presence.status)
                .addField('Plataforma conexión', authorIsConnectedFrom(args.mentions.users.first().presence))
                .addField('Fecha que se unió a Discord', args.mentions.users.first().createdAt)
                .addField('URL de Avatar', args.mentions.users.first().avatarURL);
            return embed;
        } else {
            let embed = new RichEmbed();
            embed.setColor('LUMINOUS_VIVID_PINK')
                .setAuthor(args.author.username.toUpperCase())
                .setThumbnail(args.author.avatarURL)
                .addField('Nombre de Usuario', `${args.author.tag}`)
                .addField('ID usuario', args.author.id)
                .addField('Ping de conexión', `${args.client.ping}ms`)
                .addField('Estado Actual', args.author.presence.status)
                .addField('Plataforma conexión', authorIsConnectedFrom(args.author.presence))
                .addField('Fecha que se unió a Discord', args.author.createdAt)
                .addField('URL de Avatar', args.author.avatarURL);
            return embed;
        }
    } else {
        return 'You have not permissions to use this command';
    }
}

function muteUser(args) {
    if (!args.member.hasPermission('MANAGE_MESSAGES')) {
        return 'You have not permissions to use this command';
    }
    let toMute = args.guild.member(args.mentions.users.first());
    if (!toMute) {
        return 'You have to mention one user!';
    }
    if (toMute.id === args.author.id) {
        return 'You can\'t mute yourself';
    }
    if (toMute.highestRole.position >= args.member.highestRole.position) {
        return 'You can\'t mute a member who is higher or same role than you';
    }
    let role = args.guild.roles.find(r => r.name === 'Mute User');

    if (!role) {
        role = args.guild.createRole({
            name: 'Mute User',
            color: '#00000',
            permissions: []
        });
        args.guild.channels.forEach((channel, id) => {
            channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });

    }

    if (toMute.roles.has(role.id)) return 'This user is already muted';
    toMute.addRole(role).catch(error => console.log(error));
    return 'I have muted the user';
}

function unMuteUser(args) {
    if (!args.member.hasPermission('MANAGE_MESSAGES')) {
        return args.reply('You have not permissions to use this command');
    }
    //    Get Mentioned user
    let toMute = args.guild.member(args.mentions.users.first());
    if (!toMute) return 'You have to mention one user!';
    let role = args.guild.roles.find(r => r.name === 'Mute User');
    if (!role || !toMute.roles.has(role.id)) return 'This user is not muted... \n yet (right?)';
    toMute.removeRole(role).catch(_ => 'Error found to remove role');
    return 'I have unmuted the user';
}

function purgeMessages(args, limit = undefined) {
    const fetchLimit = limit !== undefined ? limit : 99;
    if (checkPermissions(args, ['owner', 'admin'], 'or')) {
        async function clear() {
            const fetched = await args.channel.fetchMessages({limit: fetchLimit});
            args.channel.bulkDelete(fetched);
        }

        clear();
        return `I have deleted ${fetchLimit} messages from ${args.channel.name.toUpperCase()} text channel`;
    }
    return 'You have not permissions to use this command';
}

CommandsFunctions.userInformation = userInformation;
CommandsFunctions.purgeMessages = purgeMessages;
CommandsFunctions.muteUser = muteUser;
CommandsFunctions.unMuteUser = unMuteUser;
module.exports = CommandsFunctions;