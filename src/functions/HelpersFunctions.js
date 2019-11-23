const HelpersFunctions = {};

function stopBotToRead(msg) {
    return !(msg.author.bot || msg.channel.type === 'dm' || !msg.content.startsWith(process.env.PREFIX));
}

function authorIsConnectedFrom(args) {
    if (args.clientStatus.web !== undefined) {
        return 'Aplicación Web';
    } else if (args.clientStatus.mobile !== undefined) {
        return 'Aplicación Móvil';
    }
    return 'Aplicacion escritorio';
}

function checkPermissions(msg, permissions, condition = 'or') {
    if (Array.isArray(permissions)) {
        if (condition === 'or') {
            return msg.member.roles.some(r => permissions.includes(r.name));
        } else if (condition === 'and') {
            let value = false;
            permissions.forEach(permission => {
                value = !!msg.member.roles.find(r => r.name === permission);
            });
            return value;
        }
    }
}

HelpersFunctions.checkPermissions = checkPermissions;
HelpersFunctions.stopBotToRead = stopBotToRead;
HelpersFunctions.authorIsConnectedFrom = authorIsConnectedFrom;

module.exports = HelpersFunctions;