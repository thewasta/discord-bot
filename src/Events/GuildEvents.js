module.exports = {
    onGuildMemberAdd: (member) => {
        const channel = member.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        channel.send(`${member.user.createdAt} ${member.user.tag}joined to server`);
    },

    onGuildMemberRemove: (member) => {

    },

    onGuildMemberUpdate: () => {

    },

    onGuildUpdate: () => {
    }
};
