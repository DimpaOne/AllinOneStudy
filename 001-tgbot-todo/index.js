const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const token = '7176271858:AAEArk6rFUwav5G0Uxw2p4f6l2gihOgX8-4';

// Create a bot instance
const bot = new TelegramBot(token, {polling: true});

// Create main menu keyboard
const mainKeyboard = {
    reply_markup: {
        keyboard: [
            ['📝 Add Task', '📋 Review Tasks']
        ],
        resize_keyboard: true
    }
};

// Task management functions
function saveNewTask(task) {
    const now = new Date();
    const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const taskEntry = `- ${task}\n  Expires in: ${deadline.toLocaleString()}\n  ID: ${Date.now()}\n\n`;
    fs.appendFileSync('TASKS.md', taskEntry, 'utf8');
}

function getAllTasks() {
    try {
        if (!fs.existsSync('TASKS.md')) {
            return 'No tasks found.';
        }
        let tasks = fs.readFileSync('TASKS.md', 'utf8');
        // Clean up expired tasks
        const lines = tasks.split('\n\n').filter(task => task.trim());
        const currentTasks = lines.filter(task => {
            const deadlineMatch = task.match(/Expires in: (.+)/);
            if (deadlineMatch) {
                const deadline = new Date(deadlineMatch[1]);
                return deadline > new Date();
            }
            return false;
        });
        
        if (currentTasks.length === 0) {
            fs.writeFileSync('TASKS.md', '', 'utf8');
            return 'No active tasks found.';
        }
        
        fs.writeFileSync('TASKS.md', currentTasks.join('\n\n') + '\n\n', 'utf8');
        
        // Format tasks with numbered emojis and countdown
        const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        const formattedTasks = currentTasks.map((task, index) => {
            const taskText = task.split('\n')[0].substring(2); // Get task text without the leading '- '
            const deadlineMatch = task.match(/Expires in: (.+)/);
            if (deadlineMatch && index < numberEmojis.length) {
                const deadline = new Date(deadlineMatch[1]);
                const timeLeft = deadline - new Date();
                const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                return `${numberEmojis[index]} ${taskText} (${hoursLeft}h ${minutesLeft}m)`;
            }
            return '';
        }).filter(task => task);
        
        return formattedTasks.join('\n') || 'No active tasks found.';
    } catch (error) {
        console.error('Error reading tasks:', error);
        return 'Error reading tasks.';
    }
}

// Track user states
const userStates = {};

// Handle messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Delete user's message immediately
    bot.deleteMessage(chatId, msg.message_id);

    // Handle main menu options
    if (messageText === '📝 Add Task') {
        userStates[chatId] = 'waiting_for_task';
        bot.sendMessage(chatId, 'Please enter your task:', {
            reply_markup: {
                keyboard: [['❌ Cancel']],
                resize_keyboard: true
            }
        }).then(message => {
            setTimeout(() => {
                bot.deleteMessage(chatId, message.message_id);
            }, 3000);
        });
    } else if (messageText === '📋 Review Tasks') {
        const tasks = getAllTasks();
        bot.sendMessage(chatId, '📋 Your Tasks:\n\n' + tasks, mainKeyboard)
            .then(message => {
                // Delete the task list message after 1 minute
                setTimeout(() => {
                    bot.deleteMessage(chatId, message.message_id);
                }, 60000);
            });
    } else if (messageText === '❌ Cancel') {
        userStates[chatId] = null;
        bot.sendMessage(chatId, 'Operation cancelled.', mainKeyboard)
            .then(message => {
                setTimeout(() => {
                    bot.deleteMessage(chatId, message.message_id);
                }, 3000);
            });
    } else if (userStates[chatId] === 'waiting_for_task') {
        saveNewTask(messageText);
        userStates[chatId] = null;
        // Send confirmation and delete it after 3 seconds
        bot.sendMessage(chatId, '✅ Task saved successfully!', mainKeyboard)
            .then(message => {
                setTimeout(() => {
                    bot.deleteMessage(chatId, message.message_id);
                }, 3000);
            });
    } else {
        // Show main menu for any other message
        bot.sendMessage(chatId, 'Welcome to Task Planner! Choose an option:', mainKeyboard)
            .then(message => {
                setTimeout(() => {
                    bot.deleteMessage(chatId, message.message_id);
                }, 3000);
            });
    }
});

console.log('Task Planner Bot is running...');







