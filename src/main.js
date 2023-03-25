// Load environment variables from the .env file
require('dotenv').config();
// Import the axios library for making HTTP requests
const axios = require('axios');
// Import the discord.js library
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client with the specified intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

// When the bot is ready and connected to Discord
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Call the updateNicknames function initially
  updateNicknames();
  // Call the updateNicknames function every minute (60 * 1000 milliseconds)
  setInterval(updateNicknames, 60 * 1000);
});

// Function to fetch the price data from the API
async function getPrice() {
  try {
    // Make an HTTP GET request to fetch the data
    const response = await axios.get("https://api.dexscreener.com/latest/dex/pairs/arbitrum/0x92c63d0e701caae670c9415d91c474f686298f00");
    const data = response.data;
    // Return the price in USD
    return data.pair.priceUsd;
  } catch (error) {
    // Log any errors that occur during the API request
    console.error('Error fetching price:', error.message);
    return null;
  }
}

// Function to update the bot's nickname in all joined servers
async function updateNicknames() {
  // Fetch the price
  const price = await getPrice();
  
  // If there was an error fetching the price, skip the update
  if (price === null) {
    console.log('Skipping nickname update due to failed price fetch');
    return;
  }
  
  // Format the price to two decimal places and prepend a dollar sign
  const newNickname = "$" + parseFloat(price).toFixed(2);

  // Iterate through all the servers the bot is a member of
  client.guilds.cache.each(async (guild) => {
    try {
      // Fetch the bot's member object in the current server
      const me = await guild.members.fetch(client.user.id);
      // Update the bot's nickname in the current server
      await me.setNickname(newNickname);

      console.log(`Nickname updated in ${guild.name}`);
    } catch (error) {
      // Log any errors that occur during the nickname update
      console.error(`Error updating nickname in ${guild.name}:`, error.message);
    }
  });
}

// Log in to the Discord client using the bot token from the .env file
client.login(process.env.DISCORD_TOKEN);
