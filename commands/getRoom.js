const { cache } = require('../cache/cache');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getroom')
        .setDescription('Retrieves url for existing room'),
    async execute(interaction) {
        await interaction.reply(cache.myCache.get('w2gKey'));
    }
}