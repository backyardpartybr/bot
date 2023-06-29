const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_API_TOKEN' with the API token provided by BotFather
const bot = new TelegramBot('6337995792:AAFuDK2DhsJWbHqk31zJRiu6SSoNxs6XFwM', { polling: false });

bot.onText(/\/search (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const keyword = match[1];

  // Get the list of all channels and groups the bot is a member of
  bot.getChatList().then(chats => {
    let results = [];

    chats.forEach(chat => {
      if (chat.title.toLowerCase().includes(keyword.toLowerCase())) {
        results.push(chat.title);
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
