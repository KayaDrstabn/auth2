//const serverSchema = require(`../../models/guild`);
const discord = require('discord.js')
const userwl = require('../../models/whitelist')
const epic = require('../../epic')

module.exports = {
  name: 'interactionCreate',

  /**
   * @param {CommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    if (!interaction.isCommand() || interaction.user.bot) return;
    if (interaction.channel.type === "DM") return;


    const data = await userwl.findOne({ userId: interaction.user.id })

    const command = client.slash.get(interaction.commandName);
    if (!command) return;

    if ("988294636835569714".includes(interaction.user.id) && !data) {
      return interaction.reply({ embeds: [new discord.MessageEmbed().setDescription(`You Are Not Whitelisted !`).setColor('RED')] })
    }

    if (command.ownerOnly) {
      if (!epic.owners.includes(interaction.user.id)) {
        return interaction.reply({ embeds: [new discord.MessageEmbed().setDescription(`You Are Not The Bot `).setColor('RED')] })
      }
    }

    if (command.userPerms && !interaction.member.permissions.has(command.userPerms)) {
      return;
    }

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    try {
      const commandLogsChannel = client.channels.cache.get(`${epic.log_channel}`);
      if (!commandLogsChannel) return;
      commandLogsChannel.send({
        embeds: [new discord.MessageEmbed()
          .setColor("a5d7ff")
          .setAuthor({ name: `${interaction.guild.name}` })
          .addFields(
		{ name: '**Author**', value: `\`\`\`${interaction.user.tag}\`\`\`` },
		{ name: '**Command**', value: `\`\`\`${command.name}\`\`\``},
		{ name: '**Server*', value: `\`\`\`${interaction.guild.name}\`\`\`` },
		{ name: '**Server ID**', value: `\`\`\`${interaction.guild.id}\`\`\``}
	)
      
        ]
      });
      command.run(client, interaction, args)
    } catch (e) {
      interaction.reply({ content: e.message });
    }

  }
}