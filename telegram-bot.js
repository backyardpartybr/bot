const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_API_TOKEN' with your actual bot token
const bot = new TelegramBot('6337995792:AAFuDK2DhsJWbHqk31zJRiu6SSoNxs6XFwM', { polling: true });

bot.onText(/\/search (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const keyword = match[1];

  // Get updates to search for group and channel names
  bot.getUpdates().then(updates => {
    let results = [];

    updates.forEach(update => {
      const message = update.message;
      if (message.chat.type === 'channel' || message.chat.type === 'group') {
        if (message.chat.title.toLowerCase().includes(keyword.toLowerCase())) {
          results.push(message.chat.title);
        }
      }
    });

    if (results.length === 0) {
      bot.sendMessage(chatId, 'No results found.');
    } else {
      bot.sendMessage(chatId, `Results:\n${results.join('\n')}`);
    }
  }).catch(error => {
    console.error(error);
    bot.sendMessage(chatId, 'An error occurred while searching for channels and groups.');
  });
});

// Start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot started. Use the /search command followed by a keyword to search for channels and groups.');
});
