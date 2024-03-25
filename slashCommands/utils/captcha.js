const discord = require('discord.js');
const epic = require("../../epic");

module.exports = {
  name: "captcha",
  description: "📨 Captcha Metni Gönderir",
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
        .setLabel("Cevapla")
    );

    interaction.channel.send({
      embeds: [{
        title: "**ℹ️ Welcome to Nitro House!**",
        description: `
To access the entire server, please click the button below and reply to what you see in the image (to verify you are not a robot).
⚠️ The code consists of 5 letters/digits.`,
        color: 1,
        image: {
          url: "https://www.learningsuccessblog.com/files/0aainput-black.gif"
        }
      }],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "Verify",
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
