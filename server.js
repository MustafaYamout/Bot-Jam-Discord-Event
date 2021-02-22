const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const mongoose = require('mongoose');
const prefix = require(`./models/prefix`);
const fs = require('fs');

client.aliases = new Discord.Collection();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

mongoose.connect(config.MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.on("ready", async () => {
    console.log(`${client.user.tag} is Online and ready to Watch quick.db\'s Failure jkjk unless...`)
    client.user
   function randomStatus() {
    let status = ["discord.gg/tca", "Ping for Prefix!", `over ${client.users.cache.size} Online Friends! <3`, `over ${client.guilds.cache.size} Servers! <3`]
    let rstatus = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[rstatus], {type: "WATCHING"});
    }; setInterval(randomStatus, 20000)
});

client.on('message', async (message) => {
    const data = await prefix.findOne({
      GuildID: message.guild.id
  });
  if(data) {
    const prefix = data.Prefix;
    if (message.content.includes(`<@${config.clientid}>`)) 
    message.reply(`My Prefix in this Guild is \`${prefix}\`!`)
    return
   } else
   if(!data) {
    if (message.content.includes(`<@${config.clientid}>`)) 
    message.reply(`My Prefix in this Guild is \`${config.mainprefix}\``)
    return
   }})
  

client.on("message", async (message) => {
    if (message.author.bot) return;

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    
    if(data) {
        const prefix = data.Prefix;
        if (!message.content.startsWith(prefix)) return;
        const commandName = cmd.slice(prefix.length)
        const command = client.commands.get(cmd.slice(prefix.length)) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (command.guildOnly && message.channel.type === 'dm') {
          return message.reply('Hey, This command is Guild-locked! Please go to a server/guild to use this command!');
          }
          
          if (command.args && !args.length) {
            let reply = `Hey, You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
              reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
          }
          
          message.flags = [];
                while (args[0] && args[0][0] === '-') {
                    message.flags.push(args.shift().slice(1));
                }
          if (command.nsfwCommand && !message.channel.nsfw) {
                    return message.channel.send(`Sorry, i can\'t run nsfw commands on a non-nsfw channel.`)
        
                }
        
        if(command.userPermissions.length > 0) {
              let clientChannelPermissions = message.channel.permissionsFor(message.member);
               clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
              if(!clientChannelPermissions.has(command.userPermissions)) {
                  let missingPermissions = command.userPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
                  return message.channel.send(":x: You need these missing permissions to execute the command: "+" `" + missingPermissions + "` ")
              }
          }
        
        if(command.clientPermissions.length > 0) {
              let clientChannelPermissions = message.channel.permissionsFor(client.user);
        
        
               clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
        
              if(!clientChannelPermissions.has(command.clientPermissions)) {
        
                  let missingPermissions = command.clientPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
                    return message.channel.send(":x: I need these permissions that I lack to execute the command: "+" `" + missingPermissions + "` ")
        }
        }
        
        if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
          }
        }
          timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        try {
          command.execute(message, args, Discord, client);
        } catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
        }
    } else if (!data) {
        const prefix = config.mainprefix;
      
      if (!message.content.startsWith(prefix)) return;
      const commandName = cmd.slice(prefix.length)
      const command = client.commands.get(cmd.slice(prefix.length)) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
      if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('Hey, This command is Guild-locked! Please go to a server/guild to use this command!');
        }
        
        if (command.args && !args.length) {
          let reply = `Hey, You didn't provide any arguments, ${message.author}!`;
          if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
          }
          return message.channel.send(reply);
        }
        
        message.flags = [];
              while (args[0] && args[0][0] === '-') {
                  message.flags.push(args.shift().slice(1));
              }
        if (command.nsfwCommand && !message.channel.nsfw) {
                  return message.channel.send(`Sorry, i can\'t run nsfw commands on a non-nsfw channel.`)
      
              }
      
      if(command.userPermissions.length > 0) {
            let clientChannelPermissions = message.channel.permissionsFor(message.member);
             clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
            if(!clientChannelPermissions.has(command.userPermissions)) {
                let missingPermissions = command.userPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
                return message.channel.send(":x: You need these missing permissions to execute the command: "+" `" + missingPermissions + "` ")
            }
        }
      
      if(command.clientPermissions.length > 0) {
            let clientChannelPermissions = message.channel.permissionsFor(client.user);
      
      
             clientChannelPermissions = new Discord.Permissions(clientChannelPermissions.bitfield);
      
            if(!clientChannelPermissions.has(command.clientPermissions)) {
      
                let missingPermissions = command.clientPermissions.filter(perm => clientChannelPermissions.has(perm) === false).join(', ')
                  return message.channel.send(":x: I need these permissions that I lack to execute the command: "+" `" + missingPermissions + "` ")
      }
      }
      
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
      }
        timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      try {
        command.execute(message, args, Discord, client);
      } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
      }
  }

})



client.login(config.token)