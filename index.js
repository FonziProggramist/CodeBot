const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});

const config = require("./config.json");
let TOKEN = config.TOKEN;

const fs = require("fs")

client.commands = new Discord.Collection()
const commandFile = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for(file of commandFile) {
    const commandName = file.split(".")[0]
    const command = require(`./commands/${commandName}`)
    client.commands.set(commandName, command)
}

client.on("messageCreate", msg => {
    const prefix = "a!"
    if(msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if(!command) return
        command.run(client, msg, args)
    }
})

client.on('ready', (ABC) => {
    console.log(`Я в сети с ником ${client.user.tag}!`);
    client.user.setActivity("Activite Track");
});

client.login(TOKEN);
