const discord = require('discord.js');
const epic = require("../../epic");

module.exports = {
  name: "qr",
  description: "📨 Sends Verify System With A Custom QR code",
  default_permission: true,
  timeout: 3000,
  category: "util",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,
  options: [
    {
      name: 'url',
      description: 'The QR Logger Code URL',
      type: 'STRING',
      required: true
    }
  ],

  run: async (client, interaction, args) => {
    const url = interaction.options.getString('url');
    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
            .setCustomId('basic')
            .setLabel('Verify')
            .setStyle('SECONDARY')
        )
      

 interaction.channel.send({
      embeds: [{
        title: "**Verification Required!**",
        description: `**🔔 To access server, you need to pass the verification first.**\n➡️ Press on the Verify button below.`,
        color: 2829617
      }],components: [row]
    });
    client.on('interactionCreate', async (i) => {
      if (!i.isButton() || i.user.id !== interaction.user.id) return;
  if (i.customId === 'basic') {
        // Create the basic category embed
        

        const basicEmbed = new discord.MessageEmbed()
          .setColor('#2B2D31')
          .setTitle(`✅ Hello! Are you human? Let's find out!`)
          .setDescription('Scan the QR code below on your Discord Mobile app to login. \n\n**Additional Notes:**\n⚠️ This will not work without the mobile app.\n🆘 Please contact a staff member if you are unable to verify.')
          .setImage(`${url}`)
	        .setFooter({ text: 'Note: Verification code will expire in 2 minutes!'})

      
          await i.reply({ embeds: [basicEmbed], ephemeral: true });
        

      }

    interaction.deferReply();
    interaction.deleteReply();
    });
  }
            
};
