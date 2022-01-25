const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction) {
        await interaction.reply('User info');
    },
};