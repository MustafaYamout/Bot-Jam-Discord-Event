const morse = require('morse')

module.exports = {
    name: "encodemorse",
    description: "decode a morse to utf-8",
    cooldown: 4,
    aliases: ["emorse", "em"],
    clientPermissions: [],
    guildOnly: false,
    userPermissions: [],
    async execute(message, args, Discord, client) {
        if(!args[0]) {
            return message.channel.send("Please Provide some Text to encode!")
        }

        if(args.slice().join(" ")) {
            let encoded = morse.encode(args.slice().join(" "))
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Text Encoded!")
            .setDescription(`Encoded Morse:\n\n${encoded}`)
            .setTimestamp();
            message.channel.send(embed)
             return
        }
    }
}