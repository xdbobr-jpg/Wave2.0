const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    maxHttpBufferSize: 50 * 1024 * 1024, // 50MB for file uploads
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// In-memory storage
const storage = {
    users: new Map(),
    messages: [],
    rooms: new Map([
        ['general', { id: 'general', name: 'Общий чат', type: 'public', members: [], messages: [], createdAt: Date.now() }],
        ['random', { id: 'random', name: 'Флудилка', type: 'public', members: [], messages: [], createdAt: Date.now() }],
        ['tech', { id: 'tech', name: 'Технологии', type: 'public', members: [], messages: [], createdAt: Date.now() }]
    ]),
    files: new Map(),
    onlineUsers: new Map(),
    typingUsers: new Map(),
    reactions: new Map(),
    pinnedMessages: new Map()
};

// File upload configuration
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: fileStorage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(uploadDir));

// Bot system
const bots = {
    wave: {
        id: 'bot-wave',
        name: 'Wave Bot',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=wave&backgroundColor=6750a4',
        commands: {
            '/help': () => ({
                text: `🤖 **Доступные команды:**\n
• \`/help\` - Показать справку
• \`/time\` - Текущее время
• \`/date\` - Текущая дата
• \`/weather [город]\` - Погода (демо)
• \`/joke\` - Случайная шутка
• \`/quote\` - Мотивационная цитата
• \`/flip\` - Подбросить монетку
• \`/roll [max]\` - Бросить кубик
• \`/8ball [вопрос]\` - Магический шар
• \`/calc [выражение]\` - Калькулятор
• \`/poll [вопрос] | [вариант1] | [вариант2]...\` - Создать опрос
• \`/remind [минуты] [текст]\` - Напоминание
• \`/translate [текст]\` - Перевод (демо)
• \`/stats\` - Статистика чата`
            }),
            '/time': () => ({
                text: `🕐 Текущее время: **${new Date().toLocaleTimeString('ru-RU')}**`
            }),
            '/date': () => ({
                text: `📅 Сегодня: **${new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}**`
            }),
            '/weather': (args) => {
                const city = args || 'Москва';
                const temps = ['-5', '0', '5', '10', '15', '20', '25', '30'];
                const conditions = ['☀️ Солнечно', '⛅ Облачно', '🌧️ Дождь', '❄️ Снег', '🌤️ Переменная облачность'];
                return {
                    text: `🌡️ Погода в **${city}**:\n${conditions[Math.floor(Math.random() * conditions.length)]}\nТемпература: **${temps[Math.floor(Math.random() * temps.length)]}°C**`
                };
            },
            '/joke': () => {
                const jokes = [
                    'Почему программисты путают Хэллоуин и Рождество? Потому что 31 OCT = 25 DEC 🎃',
                    'Жена программиста: "Сходи в магазин, купи батон хлеба. Если будут яйца — возьми десяток." Программист вернулся с 10 батонами 🍞',
                    'Как программист меняет лампочку? Никак, это аппаратная проблема 💡',
                    'Почему Java-разработчики носят очки? Потому что они не C# 👓',
                    'В чём разница между машинным обучением и AI? В размере зарплаты 💰',
                    'Сколько программистов нужно, чтобы вкрутить лампочку? Ни одного — это аппаратная проблема! 🔧'
                ];
                return { text: `😄 ${jokes[Math.floor(Math.random() * jokes.length)]}` };
            },
            '/quote': () => {
                const quotes = [
                    '"Код — это поэзия." — Линус Торвальдс',
                    '"Простота — высшая степень изощрённости." — Леонардо да Винчи',
                    '"Сначала решите проблему. Потом пишите код." — Джон Джонсон',
                    '"Любой дурак может написать код, который поймёт компьютер. Хорошие программисты пишут код, который поймут люди." — Мартин Фаулер',
                    '"Программирование — это искусство говорить другому человеку, что ты хочешь, чтобы компьютер сделал." — Дональд Кнут',
                    '"Лучший код — это отсутствие кода." — Джефф Этвуд'
                ];
                return { text: `💭 ${quotes[Math.floor(Math.random() * quotes.length)]}` };
            },
            '/flip': () => ({
                text: `🪙 ${Math.random() > 0.5 ? '**Орёл!** 🦅' : '**Решка!** 👑'}`
            }),
            '/roll': (args) => {
                const max = parseInt(args) || 6;
                const result = Math.floor(Math.random() * max) + 1;
                return { text: `🎲 Выпало: **${result}** (из ${max})` };
            },
            '/8ball': (args) => {
                if (!args) return { text: '🎱 Задайте вопрос после команды!' };
                const answers = [
                    'Бесспорно ✅', 'Предрешено ✅', 'Никаких сомнений ✅', 'Определённо да ✅',
                    'Можешь быть уверен ✅', 'Мне кажется — да 🤔', 'Вероятнее всего 🤔',
                    'Хорошие перспективы 🤔', 'Знаки говорят — да 🤔', 'Да ✅',
                    'Пока не ясно 🔮', 'Спроси позже 🔮', 'Лучше не рассказывать 🔮',
                    'Сейчас нельзя предсказать 🔮', 'Сконцентрируйся и спроси опять 🔮',
                    'Даже не думай ❌', 'Мой ответ — нет ❌', 'По моим данным — нет ❌',
                    'Перспективы не очень ❌', 'Весьма сомнительно ❌'
                ];
                return { text: `🎱 **Вопрос:** ${args}\n**Ответ:** ${answers[Math.floor(Math.random() * answers.length)]}` };
            },
            '/calc': (args) => {
                if (!args) return { text: '🔢 Введите выражение после команды!' };
                try {
                    // Safe eval for basic math
                    const sanitized = args.replace(/[^0-9+\-*/().%\s]/g, '');
                    const result = Function('"use strict"; return (' + sanitized + ')')();
                    return { text: `🔢 ${args} = **${result}**` };
                } catch (e) {
                    return { text: '❌ Ошибка вычисления. Проверьте выражение.' };
                }
            },
            '/poll': (args) => {
                if (!args) return { text: '📊 Формат: /poll Вопрос | Вариант1 | Вариант2 | ...' };
                const parts = args.split('|').map(p => p.trim());
                if (parts.length < 3) return { text: '📊 Нужен вопрос и минимум 2 варианта!' };
                const question = parts[0];
                const options = parts.slice(1);
                const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
                let pollText = `📊 **Опрос:** ${question}\n\n`;
                options.forEach((opt, i) => {
                    pollText += `${emojis[i] || '•'} ${opt}\n`;
                });
                pollText += '\n_Реагируйте на сообщение для голосования!_';
                return { text: pollText, isPoll: true };
            },
            '/stats': () => {
                const totalMessages = storage.messages.length;
                const totalUsers = storage.users.size;
                const onlineNow = storage.onlineUsers.size;
                const totalRooms = storage.rooms.size;
                return {
                    text: `📈 **Статистика Wave Messenger:**\n
• Всего сообщений: **${totalMessages}**
• Зарегистрировано пользователей: **${totalUsers}**
• Сейчас онлайн: **${onlineNow}**
• Комнат: **${totalRooms}**`
                };
            }
        }
    },
    assistant: {
        id: 'bot-assistant',
        name: 'AI Assistant',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=assistant&backgroundColor=7c4dff',
        commands: {
            '/ai': (args) => {
                if (!args) return { text: '🤖 Задайте вопрос после команды /ai!' };
                // Simulated AI responses
                const responses = [
                    `Интересный вопрос о "${args}"! Позвольте подумать... 🤔`,
                    `По поводу "${args}" - это действительно важная тема для обсуждения.`,
                    `"${args}" - отличный вопрос! Вот что я думаю...`,
                    `Анализируя "${args}", могу сказать, что это требует детального рассмотрения.`
                ];
                return { text: responses[Math.floor(Math.random() * responses.length)] };
            }
        }
    }
};

// Process bot commands
function processBotCommand(message, roomId) {
    const text = message.text.trim();
    if (!text.startsWith('/')) return null;

    const [command, ...argParts] = text.split(' ');
    const args = argParts.join(' ');

    for (const bot of Object.values(bots)) {
        if (bot.commands[command]) {
            const response = bot.commands[command](args);
            return {
                id: uuidv4(),
                text: response.text,
                user: bot,
                roomId,
                timestamp: Date.now(),
                type: 'bot',
                isPoll: response.isPoll || false
            };
        }
    }
    return null;
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileInfo = {
        id: uuidv4(),
        originalName: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`,
        uploadedAt: Date.now()
    };

    storage.files.set(fileInfo.id, fileInfo);
    res.json(fileInfo);
});

// Get file info
app.get('/file/:id', (req, res) => {
    const file = storage.files.get(req.params.id);
    if (!file) {
        return res.status(404).json({ error: 'File not found' });
    }
    res.json(file);
});

// Get rooms
app.get('/api/rooms', (req, res) => {
    const rooms = Array.from(storage.rooms.values()).map(room => ({
        id: room.id,
        name: room.name,
        type: room.type,
        memberCount: room.members.length,
        lastMessage: room.messages[room.messages.length - 1] || null
    }));
    res.json(rooms);
});

// Get room messages
app.get('/api/rooms/:roomId/messages', (req, res) => {
    const room = storage.rooms.get(req.params.roomId);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }
    const limit = parseInt(req.query.limit) || 50;
    const messages = room.messages.slice(-limit);
    res.json(messages);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    let currentUser = null;
    let currentRoom = 'general';

    // User registration/login
    socket.on('user:register', (userData) => {
        const userId = userData.id || uuidv4();
        currentUser = {
            id: userId,
            socketId: socket.id,
            name: userData.name || `User_${userId.slice(0, 6)}`,
            avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
            status: 'online',
            lastSeen: Date.now(),
            createdAt: Date.now()
        };

        storage.users.set(userId, currentUser);
        storage.onlineUsers.set(socket.id, currentUser);

        socket.emit('user:registered', currentUser);
        io.emit('users:online', Array.from(storage.onlineUsers.values()));

        // Join default room
        socket.join(currentRoom);
        const room = storage.rooms.get(currentRoom);
        if (room && !room.members.includes(userId)) {
            room.members.push(userId);
        }

        // Send room list and messages
        socket.emit('rooms:list', Array.from(storage.rooms.values()).map(r => ({
            id: r.id,
            name: r.name,
            type: r.type,
            memberCount: r.members.length,
            unread: 0
        })));

        socket.emit('messages:history', room ? room.messages.slice(-100) : []);

        // Welcome message from bot
        const welcomeMsg = {
            id: uuidv4(),
            text: `👋 Добро пожаловать в Wave Messenger, **${currentUser.name}**!\n\nИспользуйте \`/help\` чтобы узнать о доступных командах бота.`,
            user: bots.wave,
            roomId: currentRoom,
            timestamp: Date.now(),
            type: 'bot'
        };
        socket.emit('message:new', welcomeMsg);
    });

    // Update user profile
    socket.on('user:update', (updates) => {
        if (!currentUser) return;

        if (updates.name) currentUser.name = updates.name;
        if (updates.avatar) currentUser.avatar = updates.avatar;
        if (updates.status) currentUser.status = updates.status;

        storage.users.set(currentUser.id, currentUser);
        storage.onlineUsers.set(socket.id, currentUser);

        io.emit('users:online', Array.from(storage.onlineUsers.values()));
        socket.emit('user:updated', currentUser);
    });

    // Join room
    socket.on('room:join', (roomId) => {
        if (!currentUser) return;

        // Leave current room
        socket.leave(currentRoom);

        // Join new room
        currentRoom = roomId;
        socket.join(roomId);

        const room = storage.rooms.get(roomId);
        if (room) {
            if (!room.members.includes(currentUser.id)) {
                room.members.push(currentUser.id);
            }
            socket.emit('messages:history', room.messages.slice(-100));
            socket.emit('room:joined', {
                roomId,
                room: {
                    ...room,
                    memberCount: room.members.length
                }
            });

            // Send member details
            const memberDetails = room.members.map(memberId => {
                const user = storage.users.get(memberId);
                const isOnline = Array.from(storage.onlineUsers.values()).some(u => u.id === memberId);
                return user ? {...user, isOnline } : null;
            }).filter(Boolean);

            socket.emit('room:members', { roomId, members: memberDetails });

            // Notify others
            socket.to(roomId).emit('room:user-joined', {
                roomId,
                user: currentUser
            });
        }
    });

    // Create room
    socket.on('room:create', (roomData) => {
        if (!currentUser) return;

        const roomId = uuidv4();
        const newRoom = {
            id: roomId,
            name: roomData.name,
            type: roomData.type || 'public',
            members: [currentUser.id],
            messages: [],
            createdAt: Date.now(),
            createdBy: currentUser.id
        };

        storage.rooms.set(roomId, newRoom);

        io.emit('room:created', {
            id: newRoom.id,
            name: newRoom.name,
            type: newRoom.type,
            memberCount: 1
        });

        socket.emit('room:join', roomId);
    });

    // Send message
    socket.on('message:send', (messageData) => {
        if (!currentUser) return;

        const message = {
            id: uuidv4(),
            text: messageData.text,
            user: {
                id: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar
            },
            roomId: currentRoom,
            timestamp: Date.now(),
            type: 'text',
            replyTo: messageData.replyTo || null,
            edited: false,
            reactions: {}
        };

        // Store message
        const room = storage.rooms.get(currentRoom);
        if (room) {
            room.messages.push(message);
            // Keep only last 1000 messages per room
            if (room.messages.length > 1000) {
                room.messages = room.messages.slice(-1000);
            }
        }
        storage.messages.push(message);

        // Broadcast message
        io.to(currentRoom).emit('message:new', message);

        // Process bot commands
        const botResponse = processBotCommand(message, currentRoom);
        if (botResponse) {
            setTimeout(() => {
                if (room) {
                    room.messages.push(botResponse);
                }
                storage.messages.push(botResponse);
                io.to(currentRoom).emit('message:new', botResponse);
            }, 500);
        }

        // Clear typing indicator
        storage.typingUsers.delete(`${currentUser.id}-${currentRoom}`);
        io.to(currentRoom).emit('typing:update', getTypingUsers(currentRoom));
    });

    // Send file message
    socket.on('message:file', (fileData) => {
        if (!currentUser) return;

        const message = {
            id: uuidv4(),
            text: fileData.caption || '',
            user: {
                id: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar
            },
            roomId: currentRoom,
            timestamp: Date.now(),
            type: 'file',
            file: {
                id: fileData.id,
                name: fileData.name,
                url: fileData.url,
                mimetype: fileData.mimetype,
                size: fileData.size
            },
            reactions: {}
        };

        const room = storage.rooms.get(currentRoom);
        if (room) {
            room.messages.push(message);
        }
        storage.messages.push(message);

        io.to(currentRoom).emit('message:new', message);
    });

    // Edit message
    socket.on('message:edit', ({ messageId, newText }) => {
        if (!currentUser) return;

        const room = storage.rooms.get(currentRoom);
        if (room) {
            const message = room.messages.find(m => m.id === messageId && m.user.id === currentUser.id);
            if (message) {
                message.text = newText;
                message.edited = true;
                message.editedAt = Date.now();
                io.to(currentRoom).emit('message:edited', message);
            }
        }
    });

    // Delete message
    socket.on('message:delete', (messageId) => {
        if (!currentUser) return;

        const room = storage.rooms.get(currentRoom);
        if (room) {
            const index = room.messages.findIndex(m => m.id === messageId && m.user.id === currentUser.id);
            if (index !== -1) {
                room.messages.splice(index, 1);
                io.to(currentRoom).emit('message:deleted', messageId);
            }
        }
    });

    // Add reaction
    socket.on('message:react', ({ messageId, emoji }) => {
        if (!currentUser) return;

        const room = storage.rooms.get(currentRoom);
        if (room) {
            const message = room.messages.find(m => m.id === messageId);
            if (message) {
                if (!message.reactions) message.reactions = {};
                if (!message.reactions[emoji]) message.reactions[emoji] = [];

                const userIndex = message.reactions[emoji].indexOf(currentUser.id);
                if (userIndex === -1) {
                    message.reactions[emoji].push(currentUser.id);
                } else {
                    message.reactions[emoji].splice(userIndex, 1);
                    if (message.reactions[emoji].length === 0) {
                        delete message.reactions[emoji];
                    }
                }

                io.to(currentRoom).emit('message:reacted', {
                    messageId,
                    reactions: message.reactions
                });
            }
        }
    });

    // Pin message
    socket.on('message:pin', (messageId) => {
        if (!currentUser) return;

        const room = storage.rooms.get(currentRoom);
        if (room) {
            const message = room.messages.find(m => m.id === messageId);
            if (message) {
                if (!storage.pinnedMessages.has(currentRoom)) {
                    storage.pinnedMessages.set(currentRoom, []);
                }
                const pinned = storage.pinnedMessages.get(currentRoom);
                const pinIndex = pinned.findIndex(p => p.id === messageId);

                if (pinIndex === -1) {
                    pinned.push(message);
                    io.to(currentRoom).emit('message:pinned', message);
                } else {
                    pinned.splice(pinIndex, 1);
                    io.to(currentRoom).emit('message:unpinned', messageId);
                }
            }
        }
    });

    // Get pinned messages
    socket.on('messages:pinned:get', () => {
        const pinned = storage.pinnedMessages.get(currentRoom) || [];
        socket.emit('messages:pinned', pinned);
    });

    // Typing indicator
    socket.on('typing:start', () => {
        if (!currentUser) return;
        storage.typingUsers.set(`${currentUser.id}-${currentRoom}`, {
            user: currentUser,
            roomId: currentRoom,
            timestamp: Date.now()
        });
        socket.to(currentRoom).emit('typing:update', getTypingUsers(currentRoom));
    });

    socket.on('typing:stop', () => {
        if (!currentUser) return;
        storage.typingUsers.delete(`${currentUser.id}-${currentRoom}`);
        socket.to(currentRoom).emit('typing:update', getTypingUsers(currentRoom));
    });

    // Search messages
    socket.on('messages:search', (query) => {
        if (!currentUser || !query) return;

        const room = storage.rooms.get(currentRoom);
        if (room) {
            const results = room.messages.filter(m =>
                m.text && m.text.toLowerCase().includes(query.toLowerCase())
            ).slice(-50);
            socket.emit('messages:search:results', results);
        }
    });

    // Get online users
    socket.on('users:online:get', () => {
        socket.emit('users:online', Array.from(storage.onlineUsers.values()));
    });

    // Direct message
    socket.on('dm:start', (targetUserId) => {
        if (!currentUser) return;

        const dmRoomId = [currentUser.id, targetUserId].sort().join('-dm-');

        if (!storage.rooms.has(dmRoomId)) {
            const targetUser = storage.users.get(targetUserId);
            storage.rooms.set(dmRoomId, {
                id: dmRoomId,
                name: targetUser ? targetUser.name : 'Direct Message',
                type: 'dm',
                members: [currentUser.id, targetUserId],
                messages: [],
                createdAt: Date.now()
            });
        }

        socket.emit('dm:created', dmRoomId);
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);

        if (currentUser) {
            currentUser.status = 'offline';
            currentUser.lastSeen = Date.now();
            storage.users.set(currentUser.id, currentUser);
        }

        storage.onlineUsers.delete(socket.id);

        // Clean up typing indicators
        for (const [key, value] of storage.typingUsers.entries()) {
            if (value.user && value.user.socketId === socket.id) {
                storage.typingUsers.delete(key);
            }
        }

        io.emit('users:online', Array.from(storage.onlineUsers.values()));
    });
});

// Helper function to get typing users for a room
function getTypingUsers(roomId) {
    const typing = [];
    const now = Date.now();

    for (const [key, value] of storage.typingUsers.entries()) {
        if (value.roomId === roomId && now - value.timestamp < 5000) {
            typing.push(value.user);
        }
    }

    return typing;
}

// Clean up old typing indicators periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of storage.typingUsers.entries()) {
        if (now - value.timestamp > 5000) {
            storage.typingUsers.delete(key);
        }
    }
}, 5000);

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Wave Messenger server running on port ${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} in your browser`);
});