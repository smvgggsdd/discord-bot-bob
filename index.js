{/* <script type ='text/javascript' src='config.js' /> */}
const { token } = require('./config');

const { Client, Intents } = require('discord.js');

const prefix = '-';

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Bobby is online');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply('User info.');
    }
});

// This needs to be last line of file
client.login(token);