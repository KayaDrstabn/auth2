const discord = require('discord.js');
const epic = require("../../epic");

module.exports = {
  name: "rule",
  description: "📨 Sends Rules Verification System",
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
        .setLabel("🔰 I Agree")
    );

    interaction.channel.send({
      embeds: [{
        title: "**Rules**",
        description: `<:arrow:1060696828133245039> I/ Username:

**Your username and avatar on Discord:**

✅ 1- It should not contain racist, homophobic, sexist expressions or references to drugs.


<:arrow:1060696828133245039> II/ Code of Conduct:

✅ 1- Insults, hate speech, threats, spam, noise pollution, provocative GIF and images etc. Do not resort to such actions. Otherwise, serious sanctions will be applied.

✅ 2- Do not send "meme" or bot commands to channels other than the reserved channels.

✅ 3- Be respectful, courteous and polite to other members and our team.

✅ 4- You have the right to express your own thoughts, but do not try to hurt anyone.

✅ 5- Avoid using abusive language; you are not warned, only verbally warned ^^

✅ 6- Respect the wishes of the staff.


<:arrow:1060696828133245039> III/ Possible sanctions:

**Sanctions may vary depending on the severity of the violation.
Sanctions will be at the discretion of the official, depending on the severity of the violation.**

✅ 1- Insults will be punished with a warning. It depends on the severity of the insults and the context.

✅ 2- Impersonating staff will result in a 7-day ban from the server, with or without the intent to harm.`,
        color: 0,
        image: {
          url: "https://media.tenor.com/u8rif2MFV3IAAAAC/rules.gif"
        }
      }],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "🔰 Kabul Et",
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