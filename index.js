const fs = require('fs');
const { token } = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.commands = new Collection();

// Search through subdirectories to find commands/ events
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the alue as the exported module
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


//might not need next block
// client.once('ready', () => {
//     console.log('Bobby is online');
// });

// or this
// client.on('interactionCreate', async interaction => {
//     if (!interaction.isCommand()) return;

//     const command = client.commands.get(interaction.commandName);

//     if (!command) return;

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
//     }
// });


// This needs to be last line of file
client.login(token);