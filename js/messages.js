/* ========================================
   GESTION DE LA MESSAGERIE AVEC AUTO-REPLY
   ======================================== */

let currentConversations = [];
let currentConversationId = null;

// Variables pour l'auto-reply
let messageScenarios = {};           // Scénarios chargés depuis JSON
let scenarioIndex = {};              // Index actuel pour chaque conversation
let typingTimeout = null;            // Timeout pour l'indicateur
let autoReplyEnabled = true;         // Activer/désactiver l'auto-reply

// Chargement des conversations
async function loadConversations() {
    try {
        const response = await fetch('data/conversations.json');
        const data = await response.json();
        currentConversations = data.conversations;
        displayConversationsList(currentConversations);

        // Charger les scénarios d'auto-reply
        await loadMessageScenarios();

        // Sélectionner la première conversation par défaut
        if (currentConversations.length > 0) {
            selectConversation(currentConversations[0].id);
        }
    } catch (error) {
        console.error('Erreur de chargement des conversations:', error);
    }
}

// Chargement des scénarios de réponses automatiques
async function loadMessageScenarios() {
    try {
        const response = await fetch('data/message-scenarios.json');
        const data = await response.json();
        messageScenarios = data;

        // Initialiser les index de scénario pour chaque conversation
        Object.keys(data.scenarios).forEach(key => {
            const conversationId = data.scenarios[key].conversationId;
            scenarioIndex[conversationId] = 0;
        });

        console.log('✅ Scénarios de messagerie chargés:', Object.keys(data.scenarios).length, 'scénarios');
    } catch (error) {
        console.error('⚠️ Erreur de chargement des scénarios (auto-reply désactivé):', error);
        autoReplyEnabled = false;
    }
}

// Affichage de la liste des conversations
function displayConversationsList(conversations) {
    const container = document.getElementById('conversations-list');
    if (!container) return;

    container.innerHTML = '';

    conversations.forEach(conv => {
        const item = document.createElement('div');
        item.className = 'conversation-item';
        item.onclick = () => selectConversation(conv.id);

        item.innerHTML = `
            <img src="${conv.avatar}" alt="${conv.name}" class="conversation-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'50\\' height=\\'50\\'%3E%3Crect fill=\\'%2300AFF0\\' width=\\'50\\' height=\\'50\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'white\\' font-size=\\'20\\'%3E${conv.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
            <div class="conversation-info">
                <div class="conversation-name">${conv.name}</div>
                <div class="conversation-last">${conv.lastMessage}</div>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary);">${conv.timestamp}</div>
        `;

        if (conv.unread) {
            item.style.fontWeight = '600';
            const badge = document.createElement('div');
            badge.style.cssText = 'width: 8px; height: 8px; background: var(--of-blue); border-radius: 50%; margin-left: auto;';
            item.appendChild(badge);
        }

        container.appendChild(item);
    });
}

// Sélection d'une conversation
function selectConversation(conversationId) {
    currentConversationId = conversationId;

    // Mise à jour de l'UI
    const items = document.querySelectorAll('.conversation-item');
    items.forEach((item, index) => {
        item.classList.toggle('active', currentConversations[index].id === conversationId);
    });

    // Affichage des messages
    const conversation = currentConversations.find(c => c.id === conversationId);
    if (conversation) {
        displayMessages(conversation);
    }
}

// Affichage des messages
function displayMessages(conversation) {
    const header = document.getElementById('messages-header');
    const content = document.getElementById('messages-content');

    if (!header || !content) return;

    // Mise à jour du header
    header.innerHTML = `
        <img src="${conversation.avatar}" alt="${conversation.name}" class="post-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'40\\' height=\\'40\\'%3E%3Crect fill=\\'%2300AFF0\\' width=\\'40\\' height=\\'40\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'white\\' font-size=\\'18\\'%3E${conversation.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
        <div>
            <div style="font-weight: 600;">${conversation.name}</div>
            <div style="font-size: 14px; color: var(--text-secondary);" id="typing-status">En ligne</div>
        </div>
    `;

    // Affichage des messages
    content.innerHTML = '';
    conversation.messages.forEach(message => {
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${message.sender}`;
        bubble.innerHTML = `
            <div>${message.text}</div>
            <div class="message-time">${message.time}</div>
        `;
        content.appendChild(bubble);
    });

    // Scroll vers le bas
    content.scrollTop = content.scrollHeight;
}

// Afficher l'indicateur "en train d'écrire"
function showTypingIndicator(conversationName) {
    const content = document.getElementById('messages-content');
    const typingStatus = document.getElementById('typing-status');

    if (!content) return;

    // Supprimer l'ancien indicateur s'il existe
    hideTypingIndicator();

    // Créer l'indicateur visuel dans les messages
    const typingBubble = document.createElement('div');
    typingBubble.className = 'message-bubble received typing-indicator';
    typingBubble.id = 'typing-indicator-bubble';
    typingBubble.innerHTML = `
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
    `;
    content.appendChild(typingBubble);

    // Mettre à jour le statut dans le header
    if (typingStatus) {
        typingStatus.textContent = 'En train d\'écrire...';
        typingStatus.style.color = 'var(--of-blue)';
    }

    // Scroll vers le bas pour voir l'indicateur
    content.scrollTop = content.scrollHeight;
}

// Cacher l'indicateur "en train d'écrire"
function hideTypingIndicator() {
    const typingBubble = document.getElementById('typing-indicator-bubble');
    const typingStatus = document.getElementById('typing-status');

    if (typingBubble) {
        typingBubble.remove();
    }

    if (typingStatus) {
        typingStatus.textContent = 'En ligne';
        typingStatus.style.color = 'var(--text-secondary)';
    }
}

// Obtenir la prochaine réponse automatique pour une conversation
function getNextAutoReply(conversationId) {
    const scenario = messageScenarios.scenarios[conversationId.toString()];

    if (!scenario || !scenario.responses) {
        console.log('⚠️ Aucun scénario trouvé pour la conversation', conversationId);
        return null;
    }

    const currentIndex = scenarioIndex[conversationId] || 0;

    // Si on a dépassé le nombre de réponses, recommencer depuis le début
    if (currentIndex >= scenario.responses.length) {
        console.log('🔄 Fin du scénario atteint, retour au début');
        scenarioIndex[conversationId] = 0;
        return scenario.responses[0];
    }

    const response = scenario.responses[currentIndex];
    scenarioIndex[conversationId] = currentIndex + 1;

    return response;
}

// Envoi d'un message avec réponse automatique
function sendMessage() {
    const input = document.getElementById('message-input');
    if (!input || !input.value.trim()) return;

    const conversation = currentConversations.find(c => c.id === currentConversationId);
    if (!conversation) return;

    // Ajouter le message de l'utilisateur
    const newMessage = {
        id: conversation.messages.length + 1,
        sender: 'sent',
        text: input.value,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = input.value;
    conversation.timestamp = 'À l\'instant';

    // Rafraîchir l'affichage
    displayMessages(conversation);
    displayConversationsList(currentConversations);

    // Vider l'input
    input.value = '';

    // Déclencher la réponse automatique si activée
    if (autoReplyEnabled) {
        triggerAutoReply(conversation);
    }
}

// Déclencher une réponse automatique
function triggerAutoReply(conversation) {
    const autoReply = getNextAutoReply(conversation.id);

    if (!autoReply) {
        console.log('⚠️ Pas de réponse automatique disponible');
        return;
    }

    const delay = autoReply.delay || messageScenarios.defaultDelay || 4000;

    console.log(`⏱️ Réponse automatique dans ${delay}ms:`, autoReply.text);

    // Afficher l'indicateur "en train d'écrire"
    showTypingIndicator(conversation.name);

    // Programmer la réponse automatique
    typingTimeout = setTimeout(() => {
        // Cacher l'indicateur
        hideTypingIndicator();

        // Ajouter le message automatique
        const autoMessage = {
            id: conversation.messages.length + 1,
            sender: 'received',
            text: autoReply.text,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };

        conversation.messages.push(autoMessage);
        conversation.lastMessage = autoReply.text;
        conversation.timestamp = 'À l\'instant';

        // Rafraîchir l'affichage
        displayMessages(conversation);
        displayConversationsList(currentConversations);

        console.log('✅ Réponse automatique envoyée');
    }, delay);
}

// Réinitialiser le scénario d'une conversation (utile pour recommencer)
function resetScenario(conversationId) {
    scenarioIndex[conversationId] = 0;
    console.log('🔄 Scénario réinitialisé pour la conversation', conversationId);
}

// Gestion de la touche Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Export des fonctions
window.loadConversations = loadConversations;
window.sendMessage = sendMessage;
window.handleKeyPress = handleKeyPress;
window.resetScenario = resetScenario;
