const discord = require('discord.js');
const users = require('../../models/users');

module.exports = {
  name: "join",
  description: "🏃 Joins all users from the database to the server",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: true,
 
  options: [
    {
      name: 'amount',
      description: 'The number of users to join (optional)',
      type: 'INTEGER'
    }
  ],

  run: async (client, interaction, args) => {
    const data = await users.find();
    let error = 0;
    let success = 0;
    let alreadyJoined = 0;
    let server_limit = 0
    let stopJoining = false;

    let amount = interaction.options.getInteger('amount') || data.length;

    if (amount <= 0) {
      return interaction.reply({
        content: "Please provide a valid amount greater than 0.",
        ephemeral: true
      });
    }

    const reply = await interaction.reply({
      embeds: [new discord.MessageEmbed()    .setColor(2829617)
    .setTitle('`🌙` 0auth2 JoinAll')
  .addFields(
        { name: '`🌎` Total', value: `${data.length}`, inline: true },
        { name: '`👥` Desired', value: `${amount}`, inline: true },
        { name: '`✅` Success', value: '0', inline: true },
        { name: '`🏞️` Already In Server', value: '0', inline: true },
        { name: '`🚫` Error', value: '0', inline: true },  { name: '`🚫` Server Limit', value: `0`, inline: true },     
    )], components: [
        new discord.MessageActionRow().addComponents(
          new discord.MessageButton()
            .setCustomId('stopJoining')
            .setLabel('Stop')
            .setStyle('DANGER')
        )
      ]
    });

    const inter = setInterval(async () => {
      if (stopJoining) {
        clearInterval(inter);
        interaction.editReply({
          
      embeds: [new discord.MessageEmbed()    .setColor(10038562)
    .setTitle('`🌙` 0auth2 JoinAll')
  .addFields(
        { name: '`🌎` Total', value: `${data.length}`, inline: true },
        { name: '`👥` Desired', value: `${amount}`, inline: true },
        { name: '`✅` Success', value: `${success}`, inline: true },
        { name: '`🏞️` Already In Server', value: `${alreadyJoined}`, inline: true },
        { name: '`🚫` Error', value: `${error}`, inline: true },    { name: '`🚫` Server Limit', value: `${server_limit}`, inline: true },   
    )],
          components: []
        });
      } else {
        interaction.editReply({      embeds: [new discord.MessageEmbed()    .setColor(2829617)
    .setTitle('`🌙` 0auth2 JoinAll')
  .addFields(
        { name: '`🌎` Total', value: `${data.length}`, inline: true },
        { name: '`👥` Desired', value: `${amount}`, inline: true },
        { name: '`✅` Success', value: `${success}`, inline: true },
        { name: '`🏞️` Already In Server', value: `${alreadyJoined}`, inline: true },
        { name: '`🚫` Error', value: `${error}`, inline: true },    { name: '`🚫` Server Limit', value: `${server_limit}`, inline: true },   
    )],
          components: [
        new discord.MessageActionRow().addComponents(
          new discord.MessageButton()
            .setCustomId('stopJoining')
            .setLabel('Stop')
            .setStyle('DANGER')
        )
      ]});
      }
    }, 1000);

    for (const i of data.slice(0, amount)) {
      const user = await client.users.fetch(i.userId).catch(() => {});
      if (interaction.guild.members.cache.get(i.userId)) {
        alreadyJoined++;
      } else {
        const replyMessage = await interaction.fetchReply();
        if (!replyMessage) break; // Stop joining if the original reply message is deleted
        await interaction.guild.members.add(user, { accessToken: i.accessToken }).catch(() => {
          error++;
        });
        success++;
      }
      await new Promise(resolve => setTimeout(resolve, 500)); // 500 milliseconds delay
    }

    clearInterval(inter);
    await interaction.editReply({      embeds: [new discord.MessageEmbed()    .setColor(5763719)
    .setTitle('`🌙` 0auth2 JoinAll')
  .addFields(
        { name: '`🌎` Total', value: `${data.length}`, inline: true },
        { name: '`👥` Desired', value: `${amount}`, inline: true },
        { name: '`✅` Success', value: `${success}`, inline: true },
        { name: '`🏞️` Already In Server', value: `${alreadyJoined}`, inline: true },
        { name: '`🚫` Error', value: `${error}`, inline: true }, { name: '`🚫` Server Limit', value: `${server_limit}`, inline: true },      
    )],
          components: []});;
  }
};
