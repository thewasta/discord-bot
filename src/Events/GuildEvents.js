module.exports = {
    onGuildMemberAdd: (callback, member) => {
        const channel = member.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        callback(channel, member);
    }
};
