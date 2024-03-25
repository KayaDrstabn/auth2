const discord = require('discord.js');
const users = require('../../models/users');

module.exports = {
  name: "users",
  description: "👥 Users in bot",
  default_permission: false,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: true,

  run: async (client, interaction, args) => {
    const data = await users.find();

    // Create an object to count users by country
    const countryCounts = {};
    data.forEach(user => {
      const countryCode = user.user_country;
      if (!countryCounts[countryCode]) {
        countryCounts[countryCode] = 0;
      }
      countryCounts[countryCode]++;
    });

    // Sort countries by user count in descending order
    const sortedCountries = Object.keys(countryCounts).sort((a, b) => countryCounts[b] - countryCounts[a]);

    // Limit the list to top 10 countries
    const topCountries = sortedCountries.slice(0, 10);

    // Create an array to hold the formatted country-count strings
    const countryList = topCountries.map(countryCode => {
      const flag = getCountryFlagEmoji(countryCode);
      return `${flag} ${countryCode}: ${countryCounts[countryCode]}`;
    });

    // Get the total number of users
    const totalUsers = data.length;

    // Create the action row with category options
    const actionRow = new discord.MessageActionRow()
      .addComponents(
        new discord.MessageButton()
          .setCustomId('basic')
          .setLabel(`Basic (${totalUsers})`)
          .setStyle('PRIMARY'),
        new discord.MessageButton()
          .setCustomId('countrys')
          .setLabel('Countrys')
          .setStyle('PRIMARY'),
        
      );

    try {
      // Reply with the initial message and action row
      if (!interaction.replied) {
        await interaction.reply({ content: 'Please select a category:', components: [actionRow] });
      }
    } catch (error) {
      // If the initial reply has already been sent or deferred, edit the existing reply if it hasn't been modified yet
      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({ content: 'Please select a category:', components: [actionRow] });
      }
    }

    // Helper function to get emoji flag for a country code
    function getCountryFlagEmoji(countryCode) {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    }

    // Handle user interaction
    client.on('interactionCreate', async (i) => {
      if (!i.isButton() || i.user.id !== interaction.user.id) return;

      if (i.customId === 'basic') {
        // Create the basic category embed
        const basicUsers = data.filter(user => user.user_country !== '');
        const basicList = basicUsers.map((user, index) => `${index + 1}- ${getCountryFlagEmoji(user.user_country)} ${user.username}: ${user.userId}`).join('\n');

        const basicEmbed = new discord.MessageEmbed()
          .setColor('#2F3136')
          .setTitle('Basic User List')
          .addField('All Users', totalUsers.toString())
          .setDescription(basicList);

        try {
          await i.reply({ embeds: [basicEmbed], ephemeral: true });
        } catch (error) {
          console.error('Failed to reply:', error);
        }
      }

      if (i.customId === 'countrys') {
        // Create the countries category embed
        const countryEmbed = new discord.MessageEmbed()
          .setColor('#2F3136')
          .setTitle('List of Countries')
          .setDescription(countryList.join('\n'));

        try {
          await i.reply({ embeds: [countryEmbed], ephemeral: true });
        } catch (error) {
          console.error('Failed to reply:', error);
        }
      }

      if (i.customId.startsWith('country_')) {
        const countryCode = i.customId.split('_')[1];
        const countryUsers = data.filter(user => user.user_country === countryCode);
        const userEntries = countryUsers.map((user, index) => {
          const flag = getCountryFlagEmoji(user.user_country);
          return `${index + 1}- ${flag} ${user.username}: ${user.userId}`;
        });

        const countryEmbed = new discord.MessageEmbed()
          .setColor('#2F3136')
          .setTitle(`Users from ${countryCode}`)
          .setDescription(userEntries.join('\n'));

        try {
          await i.reply({ embeds: [countryEmbed], ephemeral: true });
        } catch (error) {
          console.error('Failed to reply:', error);
        }
      }
    });
  }
};