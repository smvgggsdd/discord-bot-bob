{/* <script type ='text/javascript' src='config.js' /> */}
const Config = require('./config');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Bobby is online');
});

// This needs to be last line of file
client.login(Config.config.MY_KEY);