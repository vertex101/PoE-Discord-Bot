const { Client, RichEmbed } = require("discord.js");
const request = require('request');
const client = new Client();
var prefix = "!";
var newLeague = "Heist";
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
    if(message.content.includes('```poe')) {
        var sOne = message.content.split('```poe\n')
        var sTwo = sOne[1].split('\n\n```') //sTwo[0]
        let buf = Buffer.from(sTwo[0])
        let encodedData = buf.toString('base64');
        if(sTwo[0].includes('Rarity: Unique')) {
            message.channel.send('API doesnt allow the checking of Unique items!')
        }else {
            request('https://www.poeprices.info/api?l='+ newLeague +'&i='+encodedData, function (error, response, body) {
            pullData = JSON.parse(body);
            if(pullData.currency == "chaos") {
                message.channel.send("Item min "+pullData.min.toFixed(1)+"c max "+pullData.max.toFixed(1)+"c with a confidence of "+Math.round(pullData.pred_confidence_score)+"%");
            }else {
                message.channel.send("Item min "+pullData.min.toFixed(1)+"ex max "+pullData.max.toFixed(1)+"ex with a confidence of "+Math.round(pullData.pred_confidence_score)+"%");
            }
        });
        }

    }
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command == "cmds") {
        message.channel.send("Current Commands: !ex, !hunter, !doc, !mirror, !sim")
    }
    if(command == "ex") {
        request('https://poe.ninja/api/data/currencyoverview?league='+ newLeague +'&type=Currency', function (error, response, body) {
            pullData = JSON.parse(body);
            pullData.lines.forEach(function (ex) {
                if(ex.currencyTypeName == "Exalted Orb") {
                    message.channel.send("1 Exalted Orb is equal to " + Math.round(ex.receive.value) + " Chaos")
                }
            })
        });
    }
    if(command == "hunter") {
        request('https://poe.ninja/api/data/itemoverview?league='+ newLeague +'&type=UniqueAccessory', function (error, response, body) {
            pullData = JSON.parse(body);
            pullData.lines.forEach(function (hunt) {
                if(hunt.name == "Headhunter") {
                    message.channel.send("HeadHunter is worth " + hunt.exaltedValue + "ex")
                }
            })
        });
    }
    if(command == "doc") {
        request('https://poe.ninja/api/data/itemoverview?league='+ newLeague +'&type=DivinationCard', function (error, response, body) {
            pullData = JSON.parse(body);
            pullData.lines.forEach(function (doc) {
                if(doc.name == "The Doctor") {
                    message.channel.send("The Doctor is worth " + doc.exaltedValue + "ex")
                }
            })
        });
    }
    if(command == "mirror") {
        request('https://poe.ninja/api/data/currencyoverview?league='+ newLeague +'&type=Currency', function (error, response, body) {
            pullData = JSON.parse(body);
            var cc , mm
            pullData.lines.some(function (mir) {
                if(mir.currencyTypeName == "Mirror of Kalandra") {
                    mm = mir.receive.value
                }
                return mir.currencyTypeName === "Mirror of Kalandra"
            })
            pullData.lines.some(function (ccc) {
                if(ccc.currencyTypeName == "Exalted Orb") {
                    cc = ccc.receive.value
                }
                return ccc.currencyTypeName === "Exalted Orb"
            })
            message.channel.send("Mirror of Kalandra is worth " + Math.round(mm / cc) + "ex")
        });
    }
    if(command == "sim") {
        request('https://poe.ninja/api/data/currencyoverview?league='+ newLeague +'&type=Fragment', function (error, response, body) {
            pullData = JSON.parse(body);
            pullData.lines.forEach(function (sim) {
                if(sim.currencyTypeName == "Simulacrum") {
                    message.channel.send("Simulacrum is equal to " + Math.round(sim.receive.value) + " Chaos")
                }
            })
        });
    }
    if(message.author.username = "Vertex101") {
        if(command == "clear") {
            async function clear() {
                message.delete();
                const fetched = await message.channel.fetchMessages({limit: 100});
                message.channel.bulkDelete(fetched);
            }
            clear();
        }
    }
});
client.login(process.env.BOT_TOKEN); 