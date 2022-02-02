const fs = require('fs');
const { token, clientId, guildId } = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
// const { fetch } = require("node-fetch")

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

// This collection is for commands
client.commands = new Collection();

// This array is for registering slash commands on reload
const commands = [];


// Search through subdirectories to find commands/ events
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the alue as the exported module
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());

}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {

        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const rest = new REST({ version: '9'}).setToken(token);

(async () => {
    try {

        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch(error) {
        console.log(error);
    }
    
})();

// This needs to be last line of file
client.login(token);