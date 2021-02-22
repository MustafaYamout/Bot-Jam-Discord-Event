const { encode } = require('node-encoder')

module.exports = {
    name: "encodebase64",
    description: "decode a base64 to utf-8",
    cooldown: 4,
    aliases: ["ebase64", "eb64"],
    clientPermissions: [],
    guildOnly: false,
    userPermissions: [],
    async execute(message, args, Discord, client) {
        if(!args[0]) {
            return message.channel.send("Please Provide some Text to encode!")
        }

        if(args[0]) {
            let encoded = encode(args[0])
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Text Encoded!")
            .setDescription(`Encoded Base64:\n\n${encoded}`)
            .setTimestamp();
            message.channel.send(embed)
             return
        }
    }
}