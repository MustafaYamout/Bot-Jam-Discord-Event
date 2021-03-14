const encode = require('decode-encode-binary');

module.exports = {
    name: "encodebinary",
    description: "encode from Text to Binary!",
    guildOnly: false,
    cooldown: 4,
    aliases: ["ebinary", "eb"],
    clientPermissions: [],
    userPermissions: [],
    async execute(message, args, Discord, client) {
        if(!args[0]) {
            message.channel.send("Please add some Text to Convert it into Binary!")
            return
        }
        if(args.slice().join(" ")) {
            let encoded = encode.encode(args.slice().join(" "))
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Text Encoded to Binary!")
            .setDescription(`Encoded Binary:\n\n${encoded}`)
            .setTimestamp();
            message.channel.send(embed)
        }
    }
}