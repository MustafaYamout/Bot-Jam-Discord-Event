const morse = require('morse')

module.exports = {
    name: "decodemorse",
    description: "decode a morse to utf-8",
    cooldown: 4,
    aliases: ["dmorse", "dm"],
    clientPermissions: [],
    guildOnly: false,
    userPermissions: [],
    async execute(message, args, Discord, client) {
        if(!args[0]) {
            return message.channel.send("Please Provide some Text to decode!")
        }

        if(args.slice().join(" ")) {
            let decoded = morse.decode(args.slice().join(" "))
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Text Decoded!")
            .setDescription(`Decoded Morse:\n\n${decoded}`)
            .setTimestamp();
            message.channel.send(embed)
             return
        }
    }
}