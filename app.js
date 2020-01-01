const Discord = require("discord.js");
const request = require('request');
const client = new Discord.Client();

var prefix = "!";

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
    if(message.author.bot) return;
    
    if(message.content.indexOf(prefix) !== 0) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    // Let's go with a few common example commands! Feel free to delete or change those.
    
    if(command === "ex") {
        request('https://api.poe.watch/item?id=142', function (error, response, body) {
            pullData = JSON.parse(body);
            message.channel.send("1 Exalted Orb is equal to " + pullData.leagues[0].mode + " Chaos");
        });
    }
});
  
client.login(process.env.BOT_TOKEN);