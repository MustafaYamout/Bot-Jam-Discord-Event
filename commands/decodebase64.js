const { decode } = require('node-encoder')

module.exports = {
    name: "decodebase64",
    guildOnly: false,
    description: "decode a base64 to utf-8",
    cooldown: 4,
    aliases: ["dbase64", "db64"],
    clientPermissions: [],
    userPermissions: [],
    async execute(message, args, Discord, client) {
        if(!args[0]) {
            return message.channel.send("Please Provide some Base64 Text to decode!")
        }

        if(args.slice().join(" ")) {
            let decoded = decode(args.slice().join(" "))
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Base64 Decoded!")
            .setDescription(`Decoded Base64:\n\n${decoded}`)
            .setTimestamp();
            message.channel.send(embed)
             return
        }
    }
}