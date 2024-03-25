const discord = require('discord.js');
const epic = require("../../epic");

module.exports = {
  name: "auth",
  description: "🔐 Updates the authentication link",
  default_permission: true,
  timeout: 3000,
  category: "util",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: true,

  options: [
    {
      name: 'url',
      description: 'The new authentication link',
      type: 'STRING',
      required: true
    }
  ],

  run: async (client, interaction, args) => {
    const newAuthLink = interaction.options.getString('url');
    epic.authLink = newAuthLink;

 interaction.reply({
      content: `Authentication link has been updated to: ${newAuthLink}`,
      ephemeral: true
    });
  }
};
