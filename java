const TelegramBot = require('node-telegram-bot-api');
const telegramGroups = require('telegram-groups');

// Replace "YOUR_BOT_TOKEN" with your actual bot token
const bot = new TelegramBot('6337995792:AAFuDK2DhsJWbHqk31ZJRiu6SSoNxs6XFwM
', { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! Welcome to the Telegram Group and Channel Search bot. Please use the /search command to search for groups and channels.');
});

bot.onText(/\/search (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const keyword = match[1];

  if (keyword) {
    try {
      const results = await telegramGroups.searchGroups(keyword);

      if (results.length > 0) {
        const reply = results.join('\n');
        bot.sendMessage(chatId, reply);
      } else {
        bot.sendMessage(chatId, `No groups or channels found matching the keyword "${keyword}".`);
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'An error occurred while searching for groups and channels.');
    }
  } else {
    bot.sendMessage(chatId, 'Please provide a keyword to search for groups and channels.');
  }
});
