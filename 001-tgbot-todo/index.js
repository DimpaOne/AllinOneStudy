const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const token = '7176271858:AAEArk6rFUwav5G0Uxw2p4f6l2gihOgX8-4';

// Create a bot instance
const bot = new TelegramBot(token, {polling: true});

// Listen for any message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Create keyboard with buttons
    const keyboard = {
        reply_markup: {
            keyboard: [
                ['Button 1', 'Button 2'],
                ['Button 3', 'Button 4']
            ],
            resize_keyboard: true
        }
    };

    // Create inline keyboard
    const inlineKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Inline Button 1', callback_data: 'button1' },
                    { text: 'Inline Button 2', callback_data: 'button2' }
                ],
                [
                    { text: 'Visit Google', url: 'https://google.com' }
                ]
            ]
        }
    };
    
    // Log message details to console
    console.log('--------------------');
    console.log('From:', msg.from.username || msg.from.first_name);
    console.log('Message:', messageText);
    console.log('Chat ID:', chatId);
    console.log('Time:', new Date(msg.date * 1000).toLocaleString());
    console.log('--------------------');

    // Send message with regular keyboard
    bot.sendMessage(chatId, 'Here are some buttons:', keyboard);
    
    // Send message with inline keyboard
    bot.sendMessage(chatId, 'Here are some inline buttons:', inlineKeyboard);
});

// Handle callback queries from inline keyboard buttons
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    
    switch(query.data) {
        case 'button1':
            bot.sendMessage(chatId, 'You clicked Inline Button 1!');
            break;
        case 'button2':
            bot.sendMessage(chatId, 'You clicked Inline Button 2!');
            break;
    }
});

console.log('Bot is running...');
let fs = require('fs')
function saveNewTask(task) {
    //save task to TASKS.md
    //a string into a file
    fs.appendFile('TASKS.md', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }
    
    function getAllTasks() {
        return ["task1", "task2", "task3"]
    }


