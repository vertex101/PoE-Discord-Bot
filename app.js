const { Client, RichEmbed } = require("discord.js");
const request = require('request');
const client = new Client();
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
    if(command == "hunter") {
        request('https://api.poe.watch/item?id=3891', function (error, response, body) {
            pullData = JSON.parse(body);
            message.channel.send("HeadHunter is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex");
        });
    }
    if(command == "mirror") {
        request('https://api.poe.watch/item?id=3283', function (error, response, body) {
            pullData = JSON.parse(body);
            message.channel.send("Mirror of Kalandra is worth " + pullData.leagues[0].exalted.toFixed(2) + "ex");
        });
    }
    if(command == "round") {
        if(msg[1]) {
            request('https://api.poe.watch/item?id=142', function (error, response, body) {
                pullData = JSON.parse(body);
                var cTotal = (pullData.leagues[0].mode * Number("0." + msg[1] + "0"))
                message.channel.send("0." + msg[1] + "ex is " + Math.round(cTotal) + "c"); 
            });
        } else {
            message.channel.send("Usage: !round [1-9]"); 
        }
    }
    if(command == "20") {
        let embed = new RichEmbed();
        request("https://api.poe.watch/get?league=Metamorph&category=gem", function (error, responce, body) {
            top520 = JSON.parse(body);
            for(i of top520) {
                let name = i.name
                let price = i.exalted.toFixed(2)
                if(i.gemLevel == "21" && i.gemQuality == "20") {
                    embed.addField(name, price)
                }
            }
        });
        // Set the title of the field embed.addField(fruit, fruit)
        embed.setTitle('Top 5 21/20 Gems')
        // Set the color of the embed
        embed.setColor(0xFF0000)
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
});
  
client.login(NjYxNzYzNDQ1OTI1ODcxNjE2.XgwPkQ.n71SUyBDC0mHG7oBzvc8qOC3K_Q); //NjYxNzYzNDQ1OTI1ODcxNjE2.XgwPkQ.n71SUyBDC0mHG7oBzvc8qOC3K_Q     process.env.BOT_TOKEN