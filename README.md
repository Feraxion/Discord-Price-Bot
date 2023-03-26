# Discord Price Bot

This Discord bot fetches price data from an API and updates its nickname in all the servers it's a member of to display the fetched price. The bot checks for price updates and changes its nickname every minute.

## Prerequisites

To run this bot, you need to have [Node.js](https://nodejs.org/en/) installed.

## Setup

1. Clone this repository or download the code.

2. Navigate to the project directory in your terminal and run `npm install` to install the required dependencies.

3. Create a new Discord bot:

   a. Go to the [Discord Developer Portal](https://discord.com/developers/applications).

   b. Click the "New Application" button.

   c. Give your application a name and click "Create".

   d. Navigate to the "Bot" tab on the left side of the page and click "Add Bot".

   e. Copy the bot token by clicking on "Copy" under the "Token" section.

4. Delete the ".sample" part of ".env.sample" file in the project directory with the following content:

   DISCORD_TOKEN=your_bot_token_here

   Replace `your_bot_token_here` with the bot token you copied in step 3e.

5. Invite the bot to your server:

   a. In the Discord Developer Portal, navigate to the "OAuth2" tab.

   b. In the "Scopes" section, select "bot".

   c. In the "Bot Permissions" section, select "Change Nickname".

   d. Copy the generated OAuth2 URL, paste it in your browser, and follow the instructions to add the bot to your server.

## Running the bot

In the project directory, run `node src/main.js` to start the bot. It will log in to Discord and start updating its nickname according to the fetched price data.

## License

This project is licensed under the [MIT License](LICENSE).
