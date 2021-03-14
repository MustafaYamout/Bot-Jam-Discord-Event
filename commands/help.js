module.exports = {
    name: "help",
    guildOnly: false,
    description: "show da commands",
    cooldown: 4,
    aliases: ["commands"],
    clientPermissions: [],
    userPermissions: [],
    async execute(message, args, Discord, client) {
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commands!")
            .setDescription(`Command #1: \`encodebase64\`\nEncode text into base64!\n\nCommand #2: \`decodebase64\`\nDecode Base64 into text!\n\nCommand #3: \`encodebinary\`\nConvert Text into Binary Text!\n\nCommand #4: \`decodebinary\`\nDecode Binary Text into Text!\n\nCommand #5: \`setprefix\`\nChange Bot Prefix!`)
            .setTimestamp();
            message.channel.send(embed)
    }
}
