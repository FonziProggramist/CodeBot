const { MessageEmbed } = require("discord.js");

module.exports.run = (client, msg, args) => {
    const embed = new MessageEmbed()
    .setTitle("Pong!")
    .setDescription(`Пинг бота === ||${client.ws.ping}||!`)
    .setColor("AQUA")
    msg.reply({ embeds: [embed] });
}