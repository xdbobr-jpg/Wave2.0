# 🌊 Wave Messenger

A modern, feature-rich messenger application with Material You design, built to look and feel like a Google product.

![Wave Messenger](https://img.shields.io/badge/Wave-Messenger-7C4DFF?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?style=for-the-badge&logo=socket.io)

## ✨ Features

### 💬 Messaging
- **Real-time messaging** with WebSocket (Socket.IO)
- **Message editing** and **deletion**
- **Reply to messages** with quote preview
- **Reactions** with emoji picker
- **Pin messages** to chat
- **Typing indicators** - see when others are typing
- **Read receipts** with delivery status

### 📁 File Sharing
- Upload **any file type** up to 50MB
- **Image preview** with lightbox
- **Video** and **audio** playback
- **Document** preview with icons
- Drag & drop support

### 🤖 Bot System
Built-in Wave Bot with commands:
- `/help` - Show all commands
- `/time` - Current time
- `/date` - Current date
- `/weather <city>` - Weather info
- `/joke` - Random joke
- `/quote` - Inspirational quote
- `/flip` - Coin flip
- `/roll [sides]` - Dice roll
- `/8ball <question>` - Magic 8-ball
- `/calc <expression>` - Calculator
- `/poll <question> | <options>` - Create poll
- `/stats` - Server statistics
- `/echo <text>` - Echo message
- `/reverse <text>` - Reverse text
- `/upper <text>` - Uppercase
- `/lower <text>` - Lowercase

### 🎨 Material You Design
- **6 color schemes**: Purple, Blue, Green, Orange, Pink, Teal
- **Light/Dark/System** theme modes
- **Smooth animations** and transitions
- **Responsive design** for mobile and desktop
- **Google-style** UI components

### 👥 Social Features
- **Public rooms** and **private chats**
- **Direct messages** between users
- **Online users** list with status
- **User avatars** with DiceBear
- **Room creation** with customization

### 🔧 Additional Features
- **Search messages** with regex support
- **Keyboard shortcuts** (Ctrl+K for search, Escape to close)
- **Notification sounds** (toggleable)
- **Message formatting** (bold, italic, code, links)
- **Emoji picker** with categories
- **Context menu** for message actions

## 🚀 Deployment on Render

### Quick Deploy

1. **Fork or clone** this repository
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your repository
4. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy!

### Environment Variables (Optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `production` | Environment mode |

### render.yaml (Blueprint)

```yaml
services:
  - type: web
    name: wave-messenger
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wave-messenger.git
cd wave-messenger

# Install dependencies
npm install

# Start development server
npm start
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

```
wave-messenger/
├── public/
│   ├── index.html      # Main HTML with Material You components
│   ├── style.css       # Complete Material You styling (1700+ lines)
│   └── script.js       # Frontend JavaScript (1500+ lines)
├── src/
│   └── server.js       # Express + Socket.IO backend (700+ lines)
├── uploads/            # File uploads directory (auto-created)
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: Vanilla JavaScript, CSS3
- **Design**: Material You (Material Design 3)
- **Icons**: Google Material Symbols
- **Avatars**: DiceBear API
- **File Upload**: Multer

## 📝 API Endpoints

### HTTP
- `GET /` - Serve main application
- `POST /upload` - Upload file (multipart/form-data)
- `GET /uploads/:filename` - Serve uploaded files

### WebSocket Events

#### Client → Server
- `user:register` - Register new user
- `user:update` - Update user profile
- `message:send` - Send text message
- `message:file` - Send file message
- `message:edit` - Edit message
- `message:delete` - Delete message
- `message:react` - Add/remove reaction
- `message:pin` - Pin message
- `room:join` - Join room
- `room:create` - Create new room
- `dm:start` - Start direct message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `messages:search` - Search messages

#### Server → Client
- `user:registered` - User registration confirmed
- `rooms:list` - List of available rooms
- `messages:history` - Message history for room
- `message:new` - New message received
- `message:edited` - Message was edited
- `message:deleted` - Message was deleted
- `message:reacted` - Reaction updated
- `message:pinned` - Message pinned
- `message:unpinned` - Message unpinned
- `users:online` - Online users list
- `typing:update` - Typing users update
- `room:joined` - Successfully joined room
- `room:created` - New room created
- `dm:created` - DM room created

## ⚠️ Important Notes

- **In-memory storage**: All data is stored in memory and will be lost on server restart. This is by design for Render's free tier without databases.
- **File uploads**: Files are stored in the `uploads/` directory. On Render's free tier, these may be cleared periodically.
- **Scalability**: For production use with persistent data, consider adding a database (MongoDB, PostgreSQL, Redis).

## 🎯 Future Improvements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication (OAuth, JWT)
- [ ] End-to-end encryption
- [ ] Voice/Video calls (WebRTC)
- [ ] Push notifications
- [ ] Message threads
- [ ] File compression
- [ ] Rate limiting
- [ ] Admin panel

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Credits

- [Material Design 3](https://m3.material.io/) - Design system
- [Socket.IO](https://socket.io/) - Real-time communication
- [DiceBear](https://dicebear.com/) - Avatar generation
- [Google Fonts](https://fonts.google.com/) - Typography

---

Made with ❤️ by Wave Team