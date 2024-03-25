const discord = require('discord.js');

module.exports = {
  name: "buton",
  description: "📨 Sends Button",
  default_permission: true,
  timeout: 3000,
  category: "util",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  options: [
    {
      name: 'url',
      description: 'The URL for the button',
      type: 'STRING',
      required: true
    },
    {
      name: 'button_name',
      description: 'The name for the button',
      type: 'STRING',
      required: true
    }
  ],

  run: async (client, interaction, args) => {
    const url = interaction.options.getString('url');
    const buttonName = interaction.options.getString('button_name');

    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
        .setStyle('LINK')
        .setURL(url)
        .setLabel(buttonName)
    );

    interaction.deferReply();
    interaction.deleteReply();

    interaction.channel.send({ components: [row] });
  }
};
