// import fetch from "node-fetch";
const fetch = require("node-fetch");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./ping');
const { w2gKey } = require('../config.json');
const { cache } = require('../cache/cache');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('w2g')
        .setDescription('Fetches a new private room'),
    async execute(interaction) {
        fetch("https://w2g.tv/rooms/create.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "w2g_api_key": w2gKey,
                "share": "https://www.youtube.com/watch?v=A6lfeQYec7c",
                "bg_color": "#00ff00",
                "bg_opacity": "50"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("w2G: Here is your room! \n https://w2g.tv/rooms/" + data.streamkey); 
            interaction.reply("Bob's got ya a room: \n https://w2g.tv/rooms/" + data.streamkey);
            cache.myCache.set('w2gKey', data.streamkey);
            
        });
        // TODO: Implement add video to playlist and play video now
        // At some point you will need to create class to keep track of session
        // A search by song name functionality would also make this more useful
    },
};