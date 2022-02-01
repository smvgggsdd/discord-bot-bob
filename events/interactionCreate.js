module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (!interaction.isCommand()) return;

        // need to use interaction.client to access client instance in this file

        // const command = interaction.client.commands.get(interaction.commandName);
        const command = interaction.commands.get(interaction.commandName);
        
        
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};