const { Client, RichEmbed } = require("discord.js");
const request = require('request');
const client = new Client();
var prefix = "!";
var gem2120 = []
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
        if(args[1]) {
            request('https://api.poe.watch/item?id=142', function (error, response, body) {
                pullData = JSON.parse(body);
                var cTotal = (pullData.leagues[0].mode * Number("0." + args[1] + "0"))
                message.channel.send("0." + args[1] + "ex is " + Math.round(cTotal) + "c"); 
            });
        } else {
            message.channel.send("Usage: !round [1-9]"); 
        }
    }
    if(command == "20") {
        request("https://api.poe.watch/get?league=Metamorph&category=gem", function (error, responce, body) {
            top520 = JSON.parse(body);
            top520.forEach(function (fruit) {
                if(fruit.gemLevel == "21" && fruit.gemQuality == "20") { //&& fruit.change != "0"
                    gem2120.push(fruit.name+":"+fruit.exalted.toFixed(2))
                }
            });
            var gem1 = gem2120[0].split(":")
            var gem2 = gem2120[1].split(":")
            var gem3 = gem2120[2].split(":")
            var gem4 = gem2120[3].split(":")
            var gem5 = gem2120[4].split(":")
            let embed = new RichEmbed();
            embed.addField(gem1[0], gem1[1]+"ex")
            embed.addField(gem2[0], gem2[1]+"ex")
            embed.addField(gem3[0], gem3[1]+"ex")
            embed.addField(gem4[0], gem4[1]+"ex")
            embed.addField(gem5[0], gem5[1]+"ex")
            // Set the title of the field embed.addField(fruit, fruit)
            embed.setTitle('Top 5 21/20 Gems')
            // Set the color of the embed
            embed.setColor(0xFF0000)
            // Send the embed to the same channel as the message
            message.channel.send(embed);
        });
    }
    if(command == "23") {
        request("https://api.poe.watch/get?league=Metamorph&category=gem", function (error, responce, body) {
            top520 = JSON.parse(body);
            top520.forEach(function (fruit) {
                if(fruit.gemLevel == "21" && fruit.gemQuality == "23") { //&& fruit.change != "0"
                    gem2120.push(fruit.name+":"+fruit.exalted.toFixed(2))
                }
            });
            var gem1 = gem2120[0].split(":")
            var gem2 = gem2120[1].split(":")
            var gem3 = gem2120[2].split(":")
            var gem4 = gem2120[3].split(":")
            var gem5 = gem2120[4].split(":")
            let embed = new RichEmbed();
            embed.addField(gem1[0], gem1[1]+"ex")
            embed.addField(gem2[0], gem2[1]+"ex")
            embed.addField(gem3[0], gem3[1]+"ex")
            embed.addField(gem4[0], gem4[1]+"ex")
            embed.addField(gem5[0], gem5[1]+"ex")
            // Set the title of the field embed.addField(fruit, fruit)
            embed.setTitle('Top 5 21/23 Gems')
            // Set the color of the embed
            embed.setColor(0xFF0000)
            // Send the embed to the same channel as the message
            message.channel.send(embed);
        });
    }
});
  
client.login(process.env.BOT_TOKEN);