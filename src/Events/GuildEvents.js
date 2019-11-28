module.exports = {
    onGuildMemberAdd: (member) => {
        const channel = member.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        channel.send(`${member} joined to server`);
    },

    onGuildMemberRemove: async (member) => {
        const channel = member.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        channel.send(`${member} left the server`);
    },

    onGuildMemberUpdate: async (oldMember, newMember) => {
        console.log('member update 1');
        const channel = oldMember.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        channel.send(`${oldMember.user.tag} ha actualizado su perfil: ${newMember.user.tag}`);
    },

    onGuildUpdate: async (oldMember, newMember) => {
        console.log('member update 2');
        const channel = oldMember.guild.channels.find(ch => ch.id === '648546487646552107');
        if (!channel) return;
        channel.send(`${oldMember.user.tag} ha actualizado su perfil: ${newMember.user.tag}`);
    }
};
