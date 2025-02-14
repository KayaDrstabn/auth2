const discord = require('discord.js');
const epic = require("../../epic");

module.exports = {
  name: "nsfw",
  description: "📨 NSFW Onayı Gönderir",
  default_permission: true,
  timeout: 3000,
  category: "util",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
        .setStyle('LINK')
        .setURL(`${epic.authLink}`)
        .setLabel("🔞")
    );

    interaction.channel.send({
      embeds: [{
        title: "NSFW Access",
        description: "Click the emoji to confirm that you are over 18 and agree to view sexually explicit content.",
        image: {
          url: "https://cdn.discordapp.com/attachments/945812190936584233/1089594308543393792/JqoLqSb_1.gif"
        },
        color: 16711680,
      }],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "🔞",
              url: `${epic.authLink}`
            }
          ]
        }
      ]
    });

    interaction.deferReply();
    interaction.deleteReply();
  }
};
