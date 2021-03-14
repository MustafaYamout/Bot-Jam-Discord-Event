const config = require('../config.json')

module.exports = {
	name: 'eval',
  guildOnly: false,
  args: false,
  cooldown: 3,
  clientPermissions: [],
  userPermissions: [],
  usage: '[code]',
	description: 'eval only for Bot Owner!',
	execute(message, args, Discord, client){
 if(message.author.id !== config.Owner) return;
      const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
}
        try {
 
      const code = args.slice().join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

}
  
}