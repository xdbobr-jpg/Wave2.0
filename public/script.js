// Wave Messenger - Main Application Script
// Material You Design with Full Features

(function() {
    'use strict';

    // ===== Configuration =====
    var CONFIG = {
        MAX_MESSAGE_LENGTH: 4000,
        MAX_FILE_SIZE: 50 * 1024 * 1024,
        TYPING_TIMEOUT: 3000,
        TOAST_DURATION: 3000,
        SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        SUPPORTED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
        SUPPORTED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm']
    };

    // ===== Emoji Data =====
    var EMOJIS = {
        smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐'],
        people: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
        animals: ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑'],
        food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥖', '🥨', '🧀', '🥗', '🥙', '🥪', '🌮', '🌯', '🫔', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭'],
        activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '🤺', '⛹️', '🤾', '🏌️', '🏇', '🧘', '🏄', '🏊', '🤽', '🚣', '🧗'],
        travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦯', '🦽', '🦼', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸'],
        objects: ['💡', '🔦', '🏮', '🪔', '📱', '📲', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '🧮', '🎥', '🎞️', '📽️', '🎬', '📺', '📷', '📸', '📹', '📼', '🔍', '🔎', '🕯️', '💰', '💴', '💵', '💶', '💷', '💳', '💎', '⚖️', '🪜', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🪚', '🔩', '⚙️', '🪤', '🧱'],
        symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳']
    };

    // ===== State =====
    var state = {
        socket: null,
        user: null,
        currentRoom: 'general',
        rooms: new Map(),
        messages: [],
        onlineUsers: new Map(),
        typingUsers: [],
        typingTimeout: null,
        isTyping: false,
        replyTo: null,
        selectedMessage: null,
        editingMessage: null,
        theme: localStorage.getItem('theme') || 'light',
        colorScheme: localStorage.getItem('colorScheme') || 'purple',
        notificationSound: localStorage.getItem('notificationSound') !== 'false',
        notificationPreview: localStorage.getItem('notificationPreview') !== 'false',
        isMobile: window.innerWidth <= 768,
        showSidebar: true,
        currentFilter: 'all',
        unreadCounts: new Map(),
        isRecordingVoice: false,
        mediaRecorder: null,
        audioChunks: []
    };

    // ===== DOM Elements =====
    var elements = {};

    // ===== Initialization =====
    function init() {
        cacheElements();
        applyTheme();
        applyColorScheme();
        generateAvatarOptions();
        setupEventListeners();
        checkMobile();

        setTimeout(function() {
            var splashScreen = document.getElementById('splash-screen');
            if (splashScreen) {
                splashScreen.classList.add('hidden');
            }

            var savedUser = localStorage.getItem('waveUser');
            if (savedUser) {
                try {
                    state.user = JSON.parse(savedUser);
                    connectSocket();
                } catch (e) {
                    showLoginScreen();
                }
            } else {
                showLoginScreen();
            }
        }, 2000);
    }

    function cacheElements() {
        var ids = [
            'splash-screen', 'login-screen', 'app', 'login-username', 'login-btn',
            'avatar-options', 'sidebar', 'chat-list', 'online-users', 'online-count',
            'chat-main', 'empty-state', 'chat-view', 'chat-header', 'chat-info',
            'chat-avatar', 'chat-name', 'chat-status', 'messages-container', 'messages',
            'message-input', 'send-btn', 'voice-btn', 'emoji-btn', 'attach-btn',
            'typing-indicator', 'typing-text', 'reply-preview', 'reply-author',
            'reply-text', 'reply-cancel', 'scroll-bottom-btn', 'new-messages-count',
            'search-bar', 'search-input', 'search-toggle-btn', 'search-close-btn',
            'settings-modal', 'settings-btn', 'settings-avatar', 'settings-name',
            'settings-status', 'save-settings-btn', 'new-chat-modal', 'new-chat-btn',
            'create-room-modal', 'create-room-btn', 'create-room-submit', 'room-name-input',
            'emoji-picker', 'emoji-grid', 'emoji-search-input', 'context-menu',
            'reaction-picker', 'file-input', 'avatar-input', 'file-preview-modal',
            'preview-container', 'preview-filename', 'preview-download', 'close-preview',
            'toast-container', 'pinned-bar', 'pinned-text', 'pinned-close',
            'info-panel', 'close-info-btn', 'info-avatar-img', 'info-name', 'info-status',
            'members-list', 'back-btn', 'users-list', 'user-search', 'create-group-btn',
            'unread-badge', 'notification-sound', 'notification-preview', 'color-options',
            'change-avatar-btn', 'video-call-btn', 'voice-call-btn', 'chat-search-btn',
            'chat-more-btn', 'more-btn', 'leave-chat-btn', 'media-grid', 'message-input-area'
        ];

        ids.forEach(function(id) {
            var camelCase = id.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
            elements[camelCase] = document.getElementById(id);
        });
    }

    function checkMobile() {
        state.isMobile = window.innerWidth <= 768;
        if (state.isMobile) {
            if (elements.sidebar) elements.sidebar.classList.remove('hidden');
            if (elements.chatMain) elements.chatMain.classList.remove('active');
        }
    }

    // ===== Theme & Color =====
    function applyTheme() {
        if (state.theme === 'system') {
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', state.theme);
        }
        updateThemeButtons();
    }

    function applyColorScheme() {
        document.documentElement.setAttribute('data-color', state.colorScheme);
        updateColorButtons();
    }

    function updateThemeButtons() {
        document.querySelectorAll('.theme-option').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.theme === state.theme);
        });
    }

    function updateColorButtons() {
        document.querySelectorAll('.color-option').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.color === state.colorScheme);
        });
    }

    // ===== Avatar Generation =====
    function generateAvatarOptions() {
        var container = elements.avatarOptions;
        if (!container) return;

        var seeds = ['Felix', 'Aneka', 'Milo', 'Luna', 'Oscar', 'Bella', 'Max', 'Coco'];

        seeds.forEach(function(seed, index) {
            var div = document.createElement('div');
            div.className = 'avatar-option' + (index === 0 ? ' selected' : '');
            div.innerHTML = '<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=' + seed + '" alt="' + seed + '">';
            div.dataset.avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + seed;
            div.addEventListener('click', function() { selectAvatar(div); });
            container.appendChild(div);
        });
    }

    function selectAvatar(element) {
        document.querySelectorAll('.avatar-option').forEach(function(el) {
            el.classList.remove('selected');
        });
        element.classList.add('selected');
    }

    // ===== Login =====
    function showLoginScreen() {
        if (elements.loginScreen) {
            elements.loginScreen.classList.remove('hidden');
        }
    }

    function handleLogin() {
        var username = elements.loginUsername ? elements.loginUsername.value.trim() : '';
        var selectedAvatar = document.querySelector('.avatar-option.selected');

        if (!username) {
            showToast('Введите имя пользователя', 'error');
            if (elements.loginUsername) elements.loginUsername.focus();
            return;
        }

        var avatar = selectedAvatar ? selectedAvatar.dataset.avatar :
            'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now();

        state.user = {
            id: generateId(),
            name: username,
            avatar: avatar,
            status: 'online'
        };

        localStorage.setItem('waveUser', JSON.stringify(state.user));
        connectSocket();
    }

    // ===== Socket Connection =====
    function connectSocket() {
        state.socket = io({
            transports: ['websocket', 'polling']
        });

        state.socket.on('connect', function() {
            console.log('Connected to server');
            state.socket.emit('user:register', state.user);
        });

        state.socket.on('user:registered', function(user) {
            state.user = user;
            localStorage.setItem('waveUser', JSON.stringify(user));
            if (elements.loginScreen) elements.loginScreen.classList.add('hidden');
            if (elements.app) elements.app.classList.remove('hidden');
            updateUserProfile();
        });

        state.socket.on('rooms:list', function(rooms) {
            rooms.forEach(function(room) {
                state.rooms.set(room.id, room);
            });
            renderRoomList();
        });

        state.socket.on('messages:history', function(messages) {
            state.messages = messages;
            renderMessages();
            scrollToBottom(true);
        });

        state.socket.on('message:new', function(message) {
            state.messages.push(message);
            renderMessage(message);

            if (isScrolledToBottom()) {
                scrollToBottom();
            } else {
                showNewMessageIndicator();
            }

            var userId = state.user ? state.user.id : null;
            if (message.user.id !== userId && state.notificationSound) {
                playNotificationSound();
            }

            // Update unread count for other rooms
            if (message.roomId !== state.currentRoom) {
                var count = state.unreadCounts.get(message.roomId) || 0;
                state.unreadCounts.set(message.roomId, count + 1);
                updateUnreadBadges();
            }
        });

        state.socket.on('message:edited', function(message) {
            var index = -1;
            for (var i = 0; i < state.messages.length; i++) {
                if (state.messages[i].id === message.id) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                state.messages[index] = message;
                updateMessageElement(message);
            }
        });

        state.socket.on('message:deleted', function(messageId) {
            state.messages = state.messages.filter(function(m) { return m.id !== messageId; });
            var element = document.querySelector('[data-message-id="' + messageId + '"]');
            if (element) {
                element.remove();
            }
        });

        state.socket.on('message:reacted', function(data) {
            var message = null;
            for (var i = 0; i < state.messages.length; i++) {
                if (state.messages[i].id === data.messageId) {
                    message = state.messages[i];
                    break;
                }
            }
            if (message) {
                message.reactions = data.reactions;
                updateMessageReactions(data.messageId, data.reactions);
            }
        });

        state.socket.on('message:pinned', function(message) {
            showPinnedBar(message);
            showToast('Сообщение закреплено');
        });

        state.socket.on('message:unpinned', function(messageId) {
            hidePinnedBar();
            showToast('Сообщение откреплено');
        });

        state.socket.on('users:online', function(users) {
            state.onlineUsers.clear();
            users.forEach(function(user) {
                state.onlineUsers.set(user.id, user);
            });
            renderOnlineUsers();
            updateChatStatus();
            updateMembersList();
        });

        state.socket.on('typing:update', function(users) {
            var userId = state.user ? state.user.id : null;
            state.typingUsers = users.filter(function(u) { return u.id !== userId; });
            updateTypingIndicator();
        });

        state.socket.on('room:joined', function(data) {
            state.currentRoom = data.roomId;
            state.rooms.set(data.roomId, data.room);
            updateChatHeader(data.room);
            renderRoomList();
            // Clear unread for this room
            state.unreadCounts.set(data.roomId, 0);
            updateUnreadBadges();
        });

        state.socket.on('room:created', function(room) {
            state.rooms.set(room.id, room);
            renderRoomList();
            showToast('Комната "' + room.name + '" создана');
        });

        state.socket.on('dm:created', function(roomId) {
            state.socket.emit('room:join', roomId);
        });

        state.socket.on('room:members', function(data) {
            var room = state.rooms.get(data.roomId);
            if (room) {
                room.memberDetails = data.members;
                if (data.roomId === state.currentRoom) {
                    updateMembersList();
                }
            }
        });

        state.socket.on('disconnect', function() {
            console.log('Disconnected from server');
            showToast('Соединение потеряно. Переподключение...', 'error');
        });

        state.socket.on('connect_error', function(error) {
            console.error('Connection error:', error);
        });
    }

    // ===== Event Listeners =====
    function setupEventListeners() {
        // Login
        if (elements.loginBtn) {
            elements.loginBtn.addEventListener('click', handleLogin);
        }
        if (elements.loginUsername) {
            elements.loginUsername.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') handleLogin();
            });
        }

        // Message input
        if (elements.messageInput) {
            elements.messageInput.addEventListener('input', handleMessageInput);
            elements.messageInput.addEventListener('keydown', handleMessageKeydown);
        }
        if (elements.sendBtn) {
            elements.sendBtn.addEventListener('click', sendMessage);
        }

        // Voice message
        if (elements.voiceBtn) {
            elements.voiceBtn.addEventListener('click', toggleVoiceRecording);
        }

        // Emoji picker
        if (elements.emojiBtn) {
            elements.emojiBtn.addEventListener('click', toggleEmojiPicker);
        }
        setupEmojiPicker();

        // File upload
        if (elements.attachBtn) {
            elements.attachBtn.addEventListener('click', function() {
                if (elements.fileInput) elements.fileInput.click();
            });
        }
        if (elements.fileInput) {
            elements.fileInput.addEventListener('change', handleFileUpload);
        }

        // Search
        if (elements.searchToggleBtn) {
            elements.searchToggleBtn.addEventListener('click', toggleSearch);
        }
        if (elements.searchCloseBtn) {
            elements.searchCloseBtn.addEventListener('click', toggleSearch);
        }
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
        }

        // Settings
        if (elements.settingsBtn) {
            elements.settingsBtn.addEventListener('click', function() { openModal('settings-modal'); });
        }
        if (elements.saveSettingsBtn) {
            elements.saveSettingsBtn.addEventListener('click', saveSettings);
        }

        // Theme options
        document.querySelectorAll('.theme-option').forEach(function(btn) {
            btn.addEventListener('click', function() {
                state.theme = btn.dataset.theme;
                localStorage.setItem('theme', state.theme);
                applyTheme();
            });
        });

        // Color options
        document.querySelectorAll('.color-option').forEach(function(btn) {
            btn.addEventListener('click', function() {
                state.colorScheme = btn.dataset.color;
                localStorage.setItem('colorScheme', state.colorScheme);
                applyColorScheme();
            });
        });

        // New chat
        if (elements.newChatBtn) {
            elements.newChatBtn.addEventListener('click', function() {
                openModal('new-chat-modal');
                renderUsersList();
            });
        }
        if (elements.createRoomBtn) {
            elements.createRoomBtn.addEventListener('click', function() {
                closeModal('new-chat-modal');
                openModal('create-room-modal');
            });
        }
        if (elements.createGroupBtn) {
            elements.createGroupBtn.addEventListener('click', function() {
                closeModal('new-chat-modal');
                openModal('create-room-modal');
            });
        }
        if (elements.createRoomSubmit) {
            elements.createRoomSubmit.addEventListener('click', createRoom);
        }

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var modal = btn.closest('.modal');
                if (modal) modal.classList.add('hidden');
            });
        });

        // Modal backdrop click
        document.querySelectorAll('.modal-backdrop').forEach(function(backdrop) {
            backdrop.addEventListener('click', function() {
                var modal = backdrop.closest('.modal');
                if (modal) modal.classList.add('hidden');
            });
        });

        // Reply cancel
        if (elements.replyCancel) {
            elements.replyCancel.addEventListener('click', cancelReply);
        }

        // Scroll to bottom
        if (elements.scrollBottomBtn) {
            elements.scrollBottomBtn.addEventListener('click', function() { scrollToBottom(); });
        }

        // Messages container scroll
        if (elements.messages) {
            elements.messages.addEventListener('scroll', handleMessagesScroll);
        }

        // Back button (mobile)
        if (elements.backBtn) {
            elements.backBtn.addEventListener('click', goBackToSidebar);
        }

        // Chat info click
        if (elements.chatInfo) {
            elements.chatInfo.addEventListener('click', toggleInfoPanel);
        }
        if (elements.closeInfoBtn) {
            elements.closeInfoBtn.addEventListener('click', function() {
                if (elements.infoPanel) elements.infoPanel.classList.add('hidden');
            });
        }

        // Context menu
        document.addEventListener('click', hideContextMenu);
        document.addEventListener('contextmenu', handleContextMenu);
        setupContextMenuActions();

        // Reaction picker
        setupReactionPicker();

        // File preview
        if (elements.closePreview) {
            elements.closePreview.addEventListener('click', function() {
                if (elements.filePreviewModal) elements.filePreviewModal.classList.add('hidden');
            });
        }

        // Room tabs
        document.querySelectorAll('.room-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.room-tab').forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                state.currentFilter = tab.dataset.filter;
                filterRooms(tab.dataset.filter);
            });
        });

        // Navigation items
        document.querySelectorAll('.nav-item[data-view]').forEach(function(item) {
            item.addEventListener('click', function() {
                document.querySelectorAll('.nav-item').forEach(function(i) { i.classList.remove('active'); });
                item.classList.add('active');
                handleNavigation(item.dataset.view);
            });
        });

        // Notification toggles
        if (elements.notificationSound) {
            elements.notificationSound.addEventListener('change', function(e) {
                state.notificationSound = e.target.checked;
                localStorage.setItem('notificationSound', state.notificationSound);
            });
        }

        if (elements.notificationPreview) {
            elements.notificationPreview.addEventListener('change', function(e) {
                state.notificationPreview = e.target.checked;
                localStorage.setItem('notificationPreview', state.notificationPreview);
            });
        }

        // Window resize
        window.addEventListener('resize', debounce(function() {
            var wasMobile = state.isMobile;
            state.isMobile = window.innerWidth <= 768;
            if (wasMobile !== state.isMobile) {
                checkMobile();
            }
        }, 200));

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Pinned bar
        if (elements.pinnedClose) {
            elements.pinnedClose.addEventListener('click', hidePinnedBar);
        }

        // User search in new chat modal
        if (elements.userSearch) {
            elements.userSearch.addEventListener('input', debounce(handleUserSearch, 300));
        }

        // Call buttons
        if (elements.videoCallBtn) {
            elements.videoCallBtn.addEventListener('click', function() {
                showToast('Видеозвонки скоро будут доступны! 📹');
            });
        }
        if (elements.voiceCallBtn) {
            elements.voiceCallBtn.addEventListener('click', function() {
                showToast('Голосовые звонки скоро будут доступны! 📞');
            });
        }

        // Chat search
        if (elements.chatSearchBtn) {
            elements.chatSearchBtn.addEventListener('click', function() {
                showToast('Поиск по чату: используйте Ctrl+F');
            });
        }

        // More button
        if (elements.moreBtn) {
            elements.moreBtn.addEventListener('click', function() {
                openModal('settings-modal');
            });
        }

        // Chat more button
        if (elements.chatMoreBtn) {
            elements.chatMoreBtn.addEventListener('click', toggleInfoPanel);
        }

        // Leave chat button
        if (elements.leaveChatBtn) {
            elements.leaveChatBtn.addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите покинуть этот чат?')) {
                    showToast('Вы покинули чат');
                    if (elements.infoPanel) elements.infoPanel.classList.add('hidden');
                    goBackToSidebar();
                }
            });
        }

        // Avatar change
        if (elements.changeAvatarBtn) {
            elements.changeAvatarBtn.addEventListener('click', function() {
                if (elements.avatarInput) elements.avatarInput.click();
            });
        }
        if (elements.avatarInput) {
            elements.avatarInput.addEventListener('change', handleAvatarUpload);
        }

        // Touch events for mobile
        setupTouchEvents();
    }

    function setupTouchEvents() {
        // Swipe to go back on mobile
        var touchStartX = 0;
        var touchEndX = 0;

        if (elements.chatMain) {
            elements.chatMain.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            elements.chatMain.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            var swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > 100 && state.isMobile) {
                goBackToSidebar();
            }
        }
    }

    function goBackToSidebar() {
        if (state.isMobile) {
            if (elements.chatMain) {
                elements.chatMain.classList.remove('active');
                elements.chatMain.classList.add('hidden');
            }
            if (elements.sidebar) elements.sidebar.classList.remove('hidden');
        }
    }

    function handleNavigation(view) {
        // Handle navigation between different views
        switch (view) {
            case 'chats':
                state.currentFilter = 'all';
                filterRooms('all');
                break;
            case 'rooms':
                state.currentFilter = 'groups';
                filterRooms('groups');
                break;
            case 'contacts':
                openModal('new-chat-modal');
                renderUsersList();
                break;
        }
    }

    // ===== Message Handling =====
    function handleMessageInput(e) {
        var value = e.target.value;

        // Auto-resize textarea
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';

        // Toggle send/voice button
        if (value.trim()) {
            if (elements.sendBtn) elements.sendBtn.classList.remove('hidden');
            if (elements.voiceBtn) elements.voiceBtn.classList.add('hidden');
        } else {
            if (elements.sendBtn) elements.sendBtn.classList.add('hidden');
            if (elements.voiceBtn) elements.voiceBtn.classList.remove('hidden');
        }

        // Typing indicator
        if (!state.isTyping && value.trim()) {
            state.isTyping = true;
            state.socket.emit('typing:start');
        }

        clearTimeout(state.typingTimeout);
        state.typingTimeout = setTimeout(function() {
            if (state.isTyping) {
                state.isTyping = false;
                state.socket.emit('typing:stop');
            }
        }, CONFIG.TYPING_TIMEOUT);
    }

    function handleMessageKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function sendMessage() {
        if (!elements.messageInput) return;
        var text = elements.messageInput.value.trim();
        if (!text || text.length > CONFIG.MAX_MESSAGE_LENGTH) return;

        // Check if editing
        if (state.editingMessage) {
            state.socket.emit('message:edit', {
                messageId: state.editingMessage,
                newText: text
            });
            state.editingMessage = null;
        } else {
            var messageData = {
                text: text,
                replyTo: state.replyTo
            };
            state.socket.emit('message:send', messageData);
        }

        // Clear input
        elements.messageInput.value = '';
        elements.messageInput.style.height = 'auto';
        if (elements.sendBtn) elements.sendBtn.classList.add('hidden');
        if (elements.voiceBtn) elements.voiceBtn.classList.remove('hidden');

        // Clear reply
        cancelReply();

        // Stop typing
        if (state.isTyping) {
            state.isTyping = false;
            state.socket.emit('typing:stop');
        }
    }

    function renderMessages() {
        if (!elements.messages) return;
        elements.messages.innerHTML = '';

        var lastDate = null;
        state.messages.forEach(function(message) {
            var messageDate = new Date(message.timestamp).toDateString();

            if (messageDate !== lastDate) {
                renderDateDivider(message.timestamp);
                lastDate = messageDate;
            }

            renderMessage(message, false);
        });
    }

    function renderDateDivider(timestamp) {
        var date = new Date(timestamp);
        var today = new Date();
        var yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        var dateText;
        if (date.toDateString() === today.toDateString()) {
            dateText = 'Сегодня';
        } else if (date.toDateString() === yesterday.toDateString()) {
            dateText = 'Вчера';
        } else {
            var options = { day: 'numeric', month: 'long' };
            if (date.getFullYear() !== today.getFullYear()) {
                options.year = 'numeric';
            }
            dateText = date.toLocaleDateString('ru-RU', options);
        }

        var divider = document.createElement('div');
        divider.className = 'date-divider';
        divider.innerHTML = '<span>' + dateText + '</span>';
        if (elements.messages) elements.messages.appendChild(divider);
    }

    function renderMessage(message, animate) {
        if (animate === undefined) animate = true;
        if (!elements.messages) return;

        var userId = state.user ? state.user.id : null;
        var isSent = message.user.id === userId;
        var isBot = message.type === 'bot';

        var div = document.createElement('div');
        div.className = 'message ' + (isSent ? 'sent' : 'received') + (isBot ? ' bot' : '');
        div.dataset.messageId = message.id;

        var content = '';

        // Avatar
        if (!isSent) {
            content += '<img src="' + message.user.avatar + '" alt="' + message.user.name + '" class="message-avatar" onclick="window.waveApp.showUserProfile(\'' + message.user.id + '\')">';
        }

        // Bubble
        content += '<div class="message-bubble">';

        // Author (for received messages)
        if (!isSent) {
            content += '<div class="message-author" onclick="window.waveApp.showUserProfile(\'' + message.user.id + '\')">' + escapeHtml(message.user.name) + '</div>';
        }

        // Reply
        if (message.replyTo) {
            var replyMsg = null;
            for (var i = 0; i < state.messages.length; i++) {
                if (state.messages[i].id === message.replyTo) {
                    replyMsg = state.messages[i];
                    break;
                }
            }
            if (replyMsg) {
                var replyText = replyMsg.text ? replyMsg.text.substring(0, 50) : '';
                content += '<div class="message-reply">' +
                    '<div class="message-reply-author">' + escapeHtml(replyMsg.user.name) + '</div>' +
                    '<div class="message-reply-text">' + escapeHtml(replyText) + '</div>' +
                    '</div>';
            }
        }

        // File
        if (message.type === 'file' && message.file) {
            content += renderFileContent(message.file);
        }

        // Text
        if (message.text) {
            content += '<div class="message-text">' + formatMessageText(message.text) + '</div>';
        }

        // Meta
        content += '<div class="message-meta">';
        if (message.edited) {
            content += '<span class="message-edited">изменено</span>';
        }
        content += '<span class="message-time">' + formatTime(message.timestamp) + '</span>';
        if (isSent) {
            content += '<span class="material-symbols-rounded message-status">done_all</span>';
        }
        content += '</div>';

        // Reactions
        if (message.reactions && Object.keys(message.reactions).length > 0) {
            content += renderReactions(message.reactions, message.id);
        }

        content += '</div>';

        div.innerHTML = content;

        // Add event listeners
        div.addEventListener('dblclick', function() { showReactionPicker(message.id, div); });

        elements.messages.appendChild(div);

        if (animate) {
            div.style.animation = 'messageIn 0.3s ease';
        }
    }

    function renderFileContent(file) {
        var isImage = CONFIG.SUPPORTED_IMAGE_TYPES.indexOf(file.mimetype) !== -1;
        var isVideo = CONFIG.SUPPORTED_VIDEO_TYPES.indexOf(file.mimetype) !== -1;
        var isAudio = CONFIG.SUPPORTED_AUDIO_TYPES.indexOf(file.mimetype) !== -1;

        if (isImage) {
            return '<div class="message-image" onclick="window.waveApp.previewFile(\'' + file.url + '\', \'' + file.name + '\', \'' + file.mimetype + '\')">' +
                '<img src="' + file.url + '" alt="' + file.name + '" loading="lazy">' +
                '</div>';
        }

        if (isVideo) {
            return '<div class="message-video">' +
                '<video src="' + file.url + '" controls preload="metadata"></video>' +
                '</div>';
        }

        if (isAudio) {
            return '<div class="message-audio">' +
                '<audio src="' + file.url + '" controls preload="metadata"></audio>' +
                '</div>';
        }

        // Generic file
        var icon = getFileIcon(file.mimetype);
        return '<div class="message-file" onclick="window.open(\'' + file.url + '\', \'_blank\')">' +
            '<div class="file-icon">' +
            '<span class="material-symbols-rounded">' + icon + '</span>' +
            '</div>' +
            '<div class="file-info">' +
            '<div class="file-name">' + escapeHtml(file.name) + '</div>' +
            '<div class="file-size">' + formatFileSize(file.size) + '</div>' +
            '</div>' +
            '</div>';
    }

    function renderReactions(reactions, messageId) {
        var html = '<div class="message-reactions">';
        var userId = state.user ? state.user.id : null;

        for (var emoji in reactions) {
            if (reactions.hasOwnProperty(emoji)) {
                var users = reactions[emoji];
                var isActive = userId && users.indexOf(userId) !== -1;
                html += '<div class="reaction ' + (isActive ? 'active' : '') + '" ' +
                    'onclick="window.waveApp.toggleReaction(\'' + messageId + '\', \'' + emoji + '\')">' +
                    '<span>' + emoji + '</span>' +
                    '<span class="reaction-count">' + users.length + '</span>' +
                    '</div>';
            }
        }

        html += '</div>';
        return html;
    }

    function updateMessageElement(message) {
        var element = document.querySelector('[data-message-id="' + message.id + '"]');
        if (!element) return;

        var textEl = element.querySelector('.message-text');
        if (textEl) {
            textEl.innerHTML = formatMessageText(message.text);
        }

        var editedEl = element.querySelector('.message-edited');
        if (!editedEl && message.edited) {
            var meta = element.querySelector('.message-meta');
            if (meta) {
                var span = document.createElement('span');
                span.className = 'message-edited';
                span.textContent = 'изменено';
                meta.insertBefore(span, meta.firstChild);
            }
        }
    }

    function updateMessageReactions(messageId, reactions) {
        var element = document.querySelector('[data-message-id="' + messageId + '"]');
        if (!element) return;

        var reactionsEl = element.querySelector('.message-reactions');

        if (Object.keys(reactions).length === 0) {
            if (reactionsEl) reactionsEl.remove();
            return;
        }

        var newReactionsHtml = renderReactions(reactions, messageId);

        if (reactionsEl) {
            reactionsEl.outerHTML = newReactionsHtml;
        } else {
            var bubble = element.querySelector('.message-bubble');
            if (bubble) {
                bubble.insertAdjacentHTML('beforeend', newReactionsHtml);
            }
        }
    }

    function formatMessageText(text) {
        if (!text) return '';

        // Escape HTML
        var formatted = escapeHtml(text);

        // Bold: **text**
        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

        // Italic: *text* or _text_
        formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
        formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');

        // Code: `code`
        formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>');

        // Links
        formatted = formatted.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    // ===== Voice Recording =====
    function toggleVoiceRecording() {
        if (state.isRecordingVoice) {
            stopVoiceRecording();
        } else {
            startVoiceRecording();
        }
    }

    function startVoiceRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showToast('Запись голоса не поддерживается в вашем браузере', 'error');
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                state.mediaRecorder = new MediaRecorder(stream);
                state.audioChunks = [];

                state.mediaRecorder.ondataavailable = function(e) {
                    state.audioChunks.push(e.data);
                };

                state.mediaRecorder.onstop = function() {
                    var audioBlob = new Blob(state.audioChunks, { type: 'audio/webm' });
                    sendVoiceMessage(audioBlob);
                    stream.getTracks().forEach(function(track) { track.stop(); });
                };

                state.mediaRecorder.start();
                state.isRecordingVoice = true;

                if (elements.voiceBtn) {
                    elements.voiceBtn.innerHTML = '<span class="material-symbols-rounded" style="color: var(--md-error)">stop</span>';
                }
                showToast('Запись... Нажмите снова для остановки');
            })
            .catch(function(err) {
                console.error('Error accessing microphone:', err);
                showToast('Не удалось получить доступ к микрофону', 'error');
            });
    }

    function stopVoiceRecording() {
        if (state.mediaRecorder && state.isRecordingVoice) {
            state.mediaRecorder.stop();
            state.isRecordingVoice = false;

            if (elements.voiceBtn) {
                elements.voiceBtn.innerHTML = '<span class="material-symbols-rounded">mic</span>';
            }
        }
    }

    function sendVoiceMessage(audioBlob) {
        var formData = new FormData();
        formData.append('file', audioBlob, 'voice_' + Date.now() + '.webm');

        fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (!response.ok) throw new Error('Upload failed');
                return response.json();
            })
            .then(function(fileInfo) {
                state.socket.emit('message:file', {
                    id: fileInfo.id,
                    name: 'Голосовое сообщение',
                    url: fileInfo.url,
                    mimetype: 'audio/webm',
                    size: fileInfo.size
                });
                showToast('Голосовое сообщение отправлено');
            })
            .catch(function(error) {
                console.error('Upload error:', error);
                showToast('Ошибка отправки голосового сообщения', 'error');
            });
    }

    // ===== File Upload =====
    function handleFileUpload(e) {
        var files = Array.from(e.target.files);
        if (!files.length) return;

        files.forEach(function(file) {
            if (file.size > CONFIG.MAX_FILE_SIZE) {
                showToast('Файл "' + file.name + '" слишком большой (макс. 50MB)', 'error');
                return;
            }

            var formData = new FormData();
            formData.append('file', file);

            showToast('Загрузка "' + file.name + '"...');

            fetch('/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(function(response) {
                    if (!response.ok) throw new Error('Upload failed');
                    return response.json();
                })
                .then(function(fileInfo) {
                    state.socket.emit('message:file', {
                        id: fileInfo.id,
                        name: fileInfo.originalName,
                        url: fileInfo.url,
                        mimetype: fileInfo.mimetype,
                        size: fileInfo.size
                    });
                    showToast('Файл "' + file.name + '" отправлен');
                })
                .catch(function(error) {
                    console.error('Upload error:', error);
                    showToast('Ошибка загрузки "' + file.name + '"', 'error');
                });
        });

        e.target.value = '';
    }

    function handleAvatarUpload(e) {
        var file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Выберите изображение', 'error');
            return;
        }

        var formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (!response.ok) throw new Error('Upload failed');
                return response.json();
            })
            .then(function(fileInfo) {
                state.user.avatar = fileInfo.url;
                state.socket.emit('user:update', { avatar: fileInfo.url });
                if (elements.settingsAvatar) elements.settingsAvatar.src = fileInfo.url;
                showToast('Аватар обновлён');
            })
            .catch(function(error) {
                console.error('Upload error:', error);
                showToast('Ошибка загрузки аватара', 'error');
            });

        e.target.value = '';
    }

    // ===== Emoji Picker =====
    function toggleEmojiPicker() {
        if (!elements.emojiPicker) return;
        elements.emojiPicker.classList.toggle('hidden');
        if (!elements.emojiPicker.classList.contains('hidden')) {
            renderEmojis('smileys');
        }
    }

    function setupEmojiPicker() {
        // Category buttons
        document.querySelectorAll('.emoji-category').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.emoji-category').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                renderEmojis(btn.dataset.category);
            });
        });

        // Search
        if (elements.emojiSearchInput) {
            elements.emojiSearchInput.addEventListener('input', function(e) {
                var query = e.target.value.toLowerCase();
                if (!query) {
                    renderEmojis('smileys');
                    return;
                }

                var allEmojis = [];
                for (var cat in EMOJIS) {
                    if (EMOJIS.hasOwnProperty(cat)) {
                        allEmojis = allEmojis.concat(EMOJIS[cat]);
                    }
                }
                var filtered = allEmojis.filter(function(emoji) { return emoji.includes(query); });
                renderEmojiList(filtered);
            });
        }

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (elements.emojiPicker && elements.emojiBtn &&
                !elements.emojiPicker.contains(e.target) &&
                !elements.emojiBtn.contains(e.target)) {
                elements.emojiPicker.classList.add('hidden');
            }
        });
    }

    function renderEmojis(category) {
        var emojis = EMOJIS[category] || [];
        renderEmojiList(emojis);
    }

    function renderEmojiList(emojis) {
        if (!elements.emojiGrid) return;
        elements.emojiGrid.innerHTML = emojis.map(function(emoji) {
            return '<button class="emoji-item" data-emoji="' + emoji + '">' + emoji + '</button>';
        }).join('');

        elements.emojiGrid.querySelectorAll('.emoji-item').forEach(function(btn) {
            btn.addEventListener('click', function() {
                insertEmoji(btn.dataset.emoji);
            });
        });
    }

    function insertEmoji(emoji) {
        if (!elements.messageInput) return;
        var input = elements.messageInput;
        var start = input.selectionStart;
        var end = input.selectionEnd;
        var text = input.value;

        input.value = text.substring(0, start) + emoji + text.substring(end);
        input.selectionStart = input.selectionEnd = start + emoji.length;
        input.focus();

        // Trigger input event
        input.dispatchEvent(new Event('input'));
    }

    // ===== Reaction Picker =====
    function setupReactionPicker() {
        document.querySelectorAll('.reaction-btn[data-emoji]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (state.selectedMessage) {
                    state.socket.emit('message:react', {
                        messageId: state.selectedMessage,
                        emoji: btn.dataset.emoji
                    });
                }
                hideReactionPicker();
            });
        });
    }

    function showReactionPicker(messageId, element) {
        state.selectedMessage = messageId;

        var rect = element.getBoundingClientRect();
        var picker = elements.reactionPicker;
        if (!picker) return;

        picker.style.top = (rect.top - 50) + 'px';
        picker.style.left = rect.left + 'px';
        picker.classList.remove('hidden');
    }

    function hideReactionPicker() {
        if (elements.reactionPicker) {
            elements.reactionPicker.classList.add('hidden');
        }
        state.selectedMessage = null;
    }

    // ===== Context Menu =====
    function handleContextMenu(e) {
        var messageEl = e.target.closest('.message');
        if (!messageEl) return;

        e.preventDefault();

        var messageId = messageEl.dataset.messageId;
        var message = null;
        for (var i = 0; i < state.messages.length; i++) {
            if (state.messages[i].id === messageId) {
                message = state.messages[i];
                break;
            }
        }
        if (!message) return;

        state.selectedMessage = messageId;

        var menu = elements.contextMenu;
        if (!menu) return;

        var userId = state.user ? state.user.id : null;
        var isMine = message.user.id === userId;

        // Show/hide edit and delete options
        var editBtn = menu.querySelector('[data-action="edit"]');
        var deleteBtn = menu.querySelector('[data-action="delete"]');
        if (editBtn) editBtn.style.display = isMine ? 'flex' : 'none';
        if (deleteBtn) deleteBtn.style.display = isMine ? 'flex' : 'none';

        // Position menu
        var x = Math.min(e.clientX, window.innerWidth - 200);
        var y = Math.min(e.clientY, window.innerHeight - 250);

        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.remove('hidden');
    }

    function hideContextMenu() {
        if (elements.contextMenu) {
            elements.contextMenu.classList.add('hidden');
        }
    }

    function setupContextMenuActions() {
        document.querySelectorAll('.context-item').forEach(function(item) {
            item.addEventListener('click', function() {
                var action = item.dataset.action;
                var message = null;
                for (var i = 0; i < state.messages.length; i++) {
                    if (state.messages[i].id === state.selectedMessage) {
                        message = state.messages[i];
                        break;
                    }
                }

                if (!message) return;

                switch (action) {
                    case 'reply':
                        setReply(message);
                        break;
                    case 'edit':
                        editMessage(message);
                        break;
                    case 'copy':
                        copyMessage(message);
                        break;
                    case 'pin':
                        state.socket.emit('message:pin', message.id);
                        break;
                    case 'forward':
                        showToast('Пересылка скоро будет доступна');
                        break;
                    case 'delete':
                        deleteMessage(message);
                        break;
                }

                hideContextMenu();
            });
        });
    }

    function setReply(message) {
        state.replyTo = message.id;
        if (elements.replyAuthor) elements.replyAuthor.textContent = message.user.name;
        if (elements.replyText) {
            var text = message.text ? message.text.substring(0, 100) : 'Файл';
            elements.replyText.textContent = text;
        }
        if (elements.replyPreview) elements.replyPreview.classList.remove('hidden');
        if (elements.messageInput) elements.messageInput.focus();
    }

    function cancelReply() {
        state.replyTo = null;
        if (elements.replyPreview) elements.replyPreview.classList.add('hidden');
    }

    function editMessage(message) {
        if (!elements.messageInput) return;
        elements.messageInput.value = message.text || '';
        elements.messageInput.focus();
        elements.messageInput.dispatchEvent(new Event('input'));
        state.editingMessage = message.id;
    }

    function copyMessage(message) {
        navigator.clipboard.writeText(message.text || '').then(function() {
            showToast('Скопировано в буфер обмена');
        });
    }

    function deleteMessage(message) {
        if (confirm('Удалить сообщение?')) {
            state.socket.emit('message:delete', message.id);
        }
    }

    // ===== Room Management =====
    function renderRoomList() {
        var container = elements.chatList;
        if (!container) return;
        container.innerHTML = '';

        var roomsArray = [];
        state.rooms.forEach(function(room) {
            roomsArray.push(room);
        });

        // Filter rooms based on current filter
        var filteredRooms = roomsArray.filter(function(room) {
            switch (state.currentFilter) {
                case 'unread':
                    return (state.unreadCounts.get(room.id) || 0) > 0;
                case 'groups':
                    return room.type === 'public' || room.type === 'private';
                case 'dm':
                    return room.type === 'dm';
                default:
                    return true;
            }
        });

        filteredRooms.forEach(function(room) {
            var lastMessage = room.lastMessage;
            if (!lastMessage && room.messages && room.messages.length > 0) {
                lastMessage = room.messages[room.messages.length - 1];
            }
            var isActive = room.id === state.currentRoom;
            var unreadCount = state.unreadCounts.get(room.id) || 0;

            var div = document.createElement('div');
            div.className = 'chat-item' + (isActive ? ' active' : '');
            div.dataset.roomId = room.id;

            var timeHtml = lastMessage ? '<span class="chat-item-time">' + formatTime(lastMessage.timestamp) + '</span>' : '';
            var messageText = 'Нет сообщений';
            if (lastMessage) {
                var text = lastMessage.text ? lastMessage.text.substring(0, 40) : 'Файл';
                messageText = escapeHtml(text);
            }
            var badgeHtml = unreadCount > 0 ? '<span class="chat-item-badge">' + unreadCount + '</span>' : '';

            var avatarSeed = room.type === 'dm' ? room.id : room.id;
            var avatarStyle = room.type === 'dm' ? 'avataaars' : 'shapes';

            div.innerHTML = '<img src="https://api.dicebear.com/7.x/' + avatarStyle + '/svg?seed=' + avatarSeed + '" ' +
                'alt="' + room.name + '" class="chat-item-avatar">' +
                '<div class="chat-item-content">' +
                '<div class="chat-item-header">' +
                '<span class="chat-item-name">' + escapeHtml(room.name) + '</span>' +
                timeHtml +
                '</div>' +
                '<div class="chat-item-preview">' +
                '<span class="chat-item-message">' + messageText + '</span>' +
                badgeHtml +
                '</div>' +
                '</div>';

            div.addEventListener('click', function() { joinRoom(room.id); });
            container.appendChild(div);
        });

        // Show empty state if no rooms match filter
        if (filteredRooms.length === 0) {
            var emptyDiv = document.createElement('div');
            emptyDiv.className = 'chat-list-empty';
            emptyDiv.style.cssText = 'text-align: center; padding: 32px; color: var(--md-on-surface-variant);';
            emptyDiv.innerHTML = '<span class="material-symbols-rounded" style="font-size: 48px; opacity: 0.5;">inbox</span>' +
                '<p style="margin-top: 8px;">Нет чатов</p>';
            container.appendChild(emptyDiv);
        }
    }

    function filterRooms(filter) {
        state.currentFilter = filter;
        renderRoomList();
    }

    function joinRoom(roomId) {
        if (roomId === state.currentRoom) {
            // Just show the chat on mobile
            if (state.isMobile) {
                if (elements.sidebar) elements.sidebar.classList.add('hidden');
                if (elements.chatMain) {
                    elements.chatMain.classList.remove('hidden');
                    elements.chatMain.classList.add('active');
                }
            }
            return;
        }

        state.socket.emit('room:join', roomId);
        state.currentRoom = roomId;
        state.messages = [];

        // Update UI
        document.querySelectorAll('.chat-item').forEach(function(item) {
            item.classList.toggle('active', item.dataset.roomId === roomId);
        });

        // Show chat view
        if (elements.emptyState) elements.emptyState.classList.add('hidden');
        if (elements.chatView) elements.chatView.classList.remove('hidden');

        // Mobile: show chat, hide sidebar
        if (state.isMobile) {
            if (elements.sidebar) elements.sidebar.classList.add('hidden');
            if (elements.chatMain) {
                elements.chatMain.classList.remove('hidden');
                elements.chatMain.classList.add('active');
            }
        }
    }

    function createRoom() {
        var name = elements.roomNameInput ? elements.roomNameInput.value.trim() : '';
        var typeInput = document.querySelector('input[name="room-type"]:checked');
        var type = typeInput ? typeInput.value : 'public';

        if (!name) {
            showToast('Введите название комнаты', 'error');
            return;
        }

        state.socket.emit('room:create', { name: name, type: type });
        closeModal('create-room-modal');
        if (elements.roomNameInput) elements.roomNameInput.value = '';
    }

    function updateChatHeader(room) {
        if (!room) return;

        var avatarStyle = room.type === 'dm' ? 'avataaars' : 'shapes';
        if (elements.chatAvatar) {
            elements.chatAvatar.src = 'https://api.dicebear.com/7.x/' + avatarStyle + '/svg?seed=' + room.id;
        }
        if (elements.chatName) {
            elements.chatName.textContent = room.name;
        }
        if (elements.chatStatus) {
            var count = room.memberCount || (room.members ? room.members.length : 0);
            elements.chatStatus.textContent = count + ' участников';
        }
    }

    function updateUnreadBadges() {
        var totalUnread = 0;
        state.unreadCounts.forEach(function(count) {
            totalUnread += count;
        });

        if (elements.unreadBadge) {
            if (totalUnread > 0) {
                elements.unreadBadge.textContent = totalUnread > 99 ? '99+' : totalUnread;
                elements.unreadBadge.classList.remove('hidden');
            } else {
                elements.unreadBadge.classList.add('hidden');
            }
        }

        // Update room list to show badges
        renderRoomList();
    }

    // ===== Online Users =====
    function renderOnlineUsers() {
        var container = elements.onlineUsers;
        if (!container) return;
        container.innerHTML = '';

        if (elements.onlineCount) {
            elements.onlineCount.textContent = state.onlineUsers.size;
        }

        var userId = state.user ? state.user.id : null;
        state.onlineUsers.forEach(function(user) {
            if (user.id === userId) return;

            var div = document.createElement('div');
            div.className = 'online-user';
            div.innerHTML = '<div class="avatar-with-status">' +
                '<img src="' + user.avatar + '" alt="' + user.name + '" class="online-user-avatar">' +
                '</div>' +
                '<span class="online-user-name">' + escapeHtml(user.name) + '</span>';
            div.addEventListener('click', function() { showUserProfile(user.id); });
            container.appendChild(div);
        });
    }

    function renderUsersList() {
        var container = elements.usersList;
        if (!container) return;
        container.innerHTML = '';

        var userId = state.user ? state.user.id : null;
        state.onlineUsers.forEach(function(user) {
            if (user.id === userId) return;

            var div = document.createElement('div');
            div.className = 'user-item';
            div.innerHTML = '<img src="' + user.avatar + '" alt="' + user.name + '">' +
                '<div class="user-item-info">' +
                '<div class="user-item-name">' + escapeHtml(user.name) + '</div>' +
                '<div class="user-item-status">онлайн</div>' +
                '</div>';
            div.addEventListener('click', function() {
                startDM(user.id);
                closeModal('new-chat-modal');
            });
            container.appendChild(div);
        });

        if (state.onlineUsers.size <= 1) {
            var emptyDiv = document.createElement('div');
            emptyDiv.style.cssText = 'text-align: center; padding: 24px; color: var(--md-on-surface-variant);';
            emptyDiv.innerHTML = '<p>Нет других пользователей онлайн</p>';
            container.appendChild(emptyDiv);
        }
    }

    function startDM(userId) {
        state.socket.emit('dm:start', userId);
    }

    function updateChatStatus() {
        // Update typing indicator or online status
    }

    function showUserProfile(userId) {
        var user = state.onlineUsers.get(userId);
        if (!user) {
            // Try to find in messages
            for (var i = 0; i < state.messages.length; i++) {
                if (state.messages[i].user.id === userId) {
                    user = state.messages[i].user;
                    break;
                }
            }
        }

        if (!user) {
            showToast('Пользователь не найден');
            return;
        }

        // Create and show profile modal
        var existingModal = document.getElementById('user-profile-modal');
        if (existingModal) {
            existingModal.remove();
        }

        var isOnline = state.onlineUsers.has(userId);
        var statusClass = isOnline ? 'online' : 'offline';
        var statusText = isOnline ? 'онлайн' : 'не в сети';

        var modal = document.createElement('div');
        modal.id = 'user-profile-modal';
        modal.className = 'modal user-profile-modal';
        modal.innerHTML = '<div class="modal-backdrop"></div>' +
            '<div class="modal-content">' +
            '<div class="profile-header">' +
            '<img src="' + user.avatar + '" alt="' + user.name + '" class="profile-avatar-large">' +
            '<div class="profile-name">' + escapeHtml(user.name) + '</div>' +
            '<div class="profile-status-badge ' + statusClass + '">' + statusText + '</div>' +
            '</div>' +
            '<div class="profile-info">' +
            '<div class="profile-info-item">' +
            '<span class="material-symbols-rounded">person</span>' +
            '<div>' +
            '<div class="profile-info-label">Имя пользователя</div>' +
            '<div class="profile-info-value">' + escapeHtml(user.name) + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="profile-info-item">' +
            '<span class="material-symbols-rounded">schedule</span>' +
            '<div>' +
            '<div class="profile-info-label">Статус</div>' +
            '<div class="profile-info-value">' + statusText + '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="profile-actions">' +
            '<button class="primary-btn" id="profile-dm-btn">' +
            '<span class="material-symbols-rounded">chat</span>' +
            'Написать' +
            '</button>' +
            '</div>' +
            '</div>';

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.modal-backdrop').addEventListener('click', function() {
            modal.remove();
        });

        modal.querySelector('#profile-dm-btn').addEventListener('click', function() {
            startDM(userId);
            modal.remove();
        });
    }

    // ===== Members List =====
    function updateMembersList() {
        var container = elements.membersList;
        if (!container) return;
        container.innerHTML = '';

        var room = state.rooms.get(state.currentRoom);
        if (!room) return;

        // Get members from online users that are in this room
        var members = [];
        if (room.members) {
            room.members.forEach(function(memberId) {
                var user = state.onlineUsers.get(memberId);
                if (user) {
                    members.push(user);
                }
            });
        }

        // If no specific members, show all online users
        if (members.length === 0) {
            state.onlineUsers.forEach(function(user) {
                members.push(user);
            });
        }

        members.forEach(function(user) {
            var div = document.createElement('div');
            div.className = 'member-item';
            div.innerHTML = '<div class="avatar-with-status">' +
                '<img src="' + user.avatar + '" alt="' + user.name + '" class="member-avatar">' +
                '</div>' +
                '<div class="member-info">' +
                '<div class="member-name">' + escapeHtml(user.name) + '</div>' +
                '<div class="member-status">онлайн</div>' +
                '</div>';
            div.addEventListener('click', function() { showUserProfile(user.id); });
            container.appendChild(div);
        });

        if (members.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--md-on-surface-variant); padding: 16px;">Нет участников</p>';
        }
    }

    // ===== Typing Indicator =====
    function updateTypingIndicator() {
        if (!elements.typingIndicator) return;

        if (state.typingUsers.length === 0) {
            elements.typingIndicator.classList.add('hidden');
            return;
        }

        var names = state.typingUsers.map(function(u) { return u.name; });
        var text;

        if (names.length === 1) {
            text = names[0] + ' печатает...';
        } else if (names.length === 2) {
            text = names[0] + ' и ' + names[1] + ' печатают...';
        } else {
            text = names[0] + ' и ещё ' + (names.length - 1) + ' печатают...';
        }

        if (elements.typingText) elements.typingText.textContent = text;
        elements.typingIndicator.classList.remove('hidden');
    }

    // ===== Search =====
    function toggleSearch() {
        if (!elements.searchBar) return;
        elements.searchBar.classList.toggle('hidden');
        if (!elements.searchBar.classList.contains('hidden') && elements.searchInput) {
            elements.searchInput.focus();
        } else if (elements.searchInput) {
            elements.searchInput.value = '';
        }
    }

    function handleSearch(e) {
        var query = e.target.value.trim();
        if (!query) return;

        state.socket.emit('messages:search', query);
    }

    function handleUserSearch(e) {
        var query = e.target.value.toLowerCase();
        var container = elements.usersList;
        if (!container) return;
        container.innerHTML = '';

        var userId = state.user ? state.user.id : null;
        state.onlineUsers.forEach(function(user) {
            if (user.id === userId) return;
            if (query && user.name.toLowerCase().indexOf(query) === -1) return;

            var div = document.createElement('div');
            div.className = 'user-item';
            div.innerHTML = '<img src="' + user.avatar + '" alt="' + user.name + '">' +
                '<div class="user-item-info">' +
                '<div class="user-item-name">' + escapeHtml(user.name) + '</div>' +
                '<div class="user-item-status">онлайн</div>' +
                '</div>';
            div.addEventListener('click', function() {
                startDM(user.id);
                closeModal('new-chat-modal');
            });
            container.appendChild(div);
        });
    }

    // ===== Settings =====
    function saveSettings() {
        var name = elements.settingsName ? elements.settingsName.value.trim() : '';

        if (name && state.user && name !== state.user.name) {
            state.user.name = name;
            state.socket.emit('user:update', { name: name });
        }

        localStorage.setItem('waveUser', JSON.stringify(state.user));
        closeModal('settings-modal');
        showToast('Настройки сохранены');
    }

    function updateUserProfile() {
        if (!state.user) return;

        if (elements.settingsAvatar) elements.settingsAvatar.src = state.user.avatar;
        if (elements.settingsName) elements.settingsName.value = state.user.name;

        if (elements.notificationSound) {
            elements.notificationSound.checked = state.notificationSound;
        }
        if (elements.notificationPreview) {
            elements.notificationPreview.checked = state.notificationPreview;
        }
    }

    // ===== Pinned Messages =====
    function showPinnedBar(message) {
        if (elements.pinnedText) {
            var text = message.text ? message.text.substring(0, 50) : 'Закреплённое сообщение';
            elements.pinnedText.textContent = text;
        }
        if (elements.pinnedBar) elements.pinnedBar.classList.remove('hidden');
    }

    function hidePinnedBar() {
        if (elements.pinnedBar) elements.pinnedBar.classList.add('hidden');
    }

    // ===== Info Panel =====
    function toggleInfoPanel() {
        if (!elements.infoPanel) return;
        elements.infoPanel.classList.toggle('hidden');

        if (!elements.infoPanel.classList.contains('hidden')) {
            var room = state.rooms.get(state.currentRoom);
            if (room) {
                var avatarStyle = room.type === 'dm' ? 'avataaars' : 'shapes';
                if (elements.infoAvatarImg) {
                    elements.infoAvatarImg.src = 'https://api.dicebear.com/7.x/' + avatarStyle + '/svg?seed=' + room.id;
                }
                if (elements.infoName) elements.infoName.textContent = room.name;
                if (elements.infoStatus) {
                    var count = room.memberCount || (room.members ? room.members.length : 0);
                    elements.infoStatus.textContent = count + ' участников';
                }
                updateMembersList();
            }
        }
    }

    // ===== Scroll Handling =====
    function handleMessagesScroll() {
        if (!elements.messages) return;
        var container = elements.messages;
        var isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;

        if (elements.scrollBottomBtn) {
            elements.scrollBottomBtn.classList.toggle('hidden', isAtBottom);
        }
    }

    function isScrolledToBottom() {
        if (!elements.messages) return true;
        var container = elements.messages;
        return container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    }

    function scrollToBottom(instant) {
        if (!elements.messages) return;
        var container = elements.messages;

        setTimeout(function() {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: instant ? 'auto' : 'smooth'
            });
        }, 50);

        if (elements.scrollBottomBtn) elements.scrollBottomBtn.classList.add('hidden');
        if (elements.newMessagesCount) elements.newMessagesCount.classList.add('hidden');
    }

    function showNewMessageIndicator() {
        if (!elements.newMessagesCount) return;
        var countEl = elements.newMessagesCount;
        var current = parseInt(countEl.textContent) || 0;
        countEl.textContent = current + 1;
        countEl.classList.remove('hidden');
        if (elements.scrollBottomBtn) elements.scrollBottomBtn.classList.remove('hidden');
    }

    // ===== Modal Handling =====
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');

            var input = modal.querySelector('input');
            if (input) setTimeout(function() { input.focus(); }, 100);
        }
    }

    function closeModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // ===== File Preview =====
    function previewFile(url, name, mimetype) {
        if (!elements.previewContainer) return;
        var container = elements.previewContainer;
        container.innerHTML = '';

        if (CONFIG.SUPPORTED_IMAGE_TYPES.indexOf(mimetype) !== -1) {
            container.innerHTML = '<img src="' + url + '" alt="' + name + '">';
        } else if (CONFIG.SUPPORTED_VIDEO_TYPES.indexOf(mimetype) !== -1) {
            container.innerHTML = '<video src="' + url + '" controls autoplay></video>';
        }

        if (elements.previewFilename) elements.previewFilename.textContent = name;
        if (elements.previewDownload) {
            elements.previewDownload.href = url;
            elements.previewDownload.download = name;
        }

        if (elements.filePreviewModal) elements.filePreviewModal.classList.remove('hidden');
    }

    // ===== Toast Notifications =====
    function showToast(message, type) {
        if (!elements.toastContainer) return;
        type = type || 'info';
        var container = elements.toastContainer;

        var toast = document.createElement('div');
        toast.className = 'toast';
        var icon = type === 'error' ? 'error' : 'check_circle';
        toast.innerHTML = '<span class="material-symbols-rounded">' + icon + '</span>' +
            '<span>' + escapeHtml(message) + '</span>';

        container.appendChild(toast);

        setTimeout(function() {
            toast.classList.add('hiding');
            setTimeout(function() { toast.remove(); }, 300);
        }, CONFIG.TOAST_DURATION);
    }

    // ===== Keyboard Shortcuts =====
    function handleKeyboardShortcuts(e) {
        // Escape to close modals
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal:not(.hidden)').forEach(function(modal) {
                modal.classList.add('hidden');
            });
            hideContextMenu();
            hideReactionPicker();
            if (elements.emojiPicker) elements.emojiPicker.classList.add('hidden');

            // Also remove user profile modal if exists
            var profileModal = document.getElementById('user-profile-modal');
            if (profileModal) profileModal.remove();
        }

        // Ctrl+K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
    }

    // ===== Utility Functions =====
    function generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatTime(timestamp) {
        var date = new Date(timestamp);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Б';
        var k = 1024;
        var sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    function getFileIcon(mimetype) {
        if (mimetype.indexOf('image/') === 0) return 'image';
        if (mimetype.indexOf('video/') === 0) return 'movie';
        if (mimetype.indexOf('audio/') === 0) return 'audio_file';
        if (mimetype.indexOf('pdf') !== -1) return 'picture_as_pdf';
        if (mimetype.indexOf('word') !== -1 || mimetype.indexOf('document') !== -1) return 'description';
        if (mimetype.indexOf('sheet') !== -1 || mimetype.indexOf('excel') !== -1) return 'table_chart';
        if (mimetype.indexOf('presentation') !== -1 || mimetype.indexOf('powerpoint') !== -1) return 'slideshow';
        if (mimetype.indexOf('zip') !== -1 || mimetype.indexOf('rar') !== -1 || mimetype.indexOf('7z') !== -1) return 'folder_zip';
        return 'insert_drive_file';
    }

    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            var later = function() {
                clearTimeout(timeout);
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function playNotificationSound() {
        try {
            var audioContext = new(window.AudioContext || window.webkitAudioContext)();
            var oscillator = audioContext.createOscillator();
            var gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.1;

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported
        }
    }

    // ===== Public API =====
    window.waveApp = {
        toggleReaction: function(messageId, emoji) {
            state.socket.emit('message:react', { messageId: messageId, emoji: emoji });
        },
        previewFile: previewFile,
        showUserProfile: showUserProfile
    };

    // ===== Start Application =====
    document.addEventListener('DOMContentLoaded', init);
})();