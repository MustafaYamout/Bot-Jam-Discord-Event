const decode = require('decode-encode-binary');

module.exports = {
    name: "decodebinary",
    description: "encode from Text to Binary!",
    guildOnly: false,
    cooldown: 4,
    aliases: ["dbinary", "db"],
    clientPermissions: [],
    userPermissions: [],
    async execute(message, args, Discord, client) {
        if(!args[0]) {
            message.channel.send("Please add some Binary Text to Convert it into Text!")
            return
        }
        if(args.slice().join(" ")) {
            let decoded = decode.decode(args.slice().join(" "))
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Binary Text Decoded to Normal Text!")
            .setDescription(`Encoded Binary:\n\n${decoded}`)
            .setTimestamp();
            message.channel.send(embed)
        }
    }
}