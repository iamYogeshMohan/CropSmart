const chatData = {
    faqs: [
        {
            question: "Why are my leaves turning yellow?",
            answer: "Yellowing leaves (chlorosis) can be caused by nitrogen deficiency, overwatering, or poor drainage. Try adding nitrogen-rich fertilizer and checking soil moisture."
        },
        {
            question: "How much water does wheat need?",
            answer: "Wheat typically needs about 450-650 mm of water per season. Critical stages for watering are crown root initiation (20-25 days after sowing) and flowering."
        },
        {
            question: "Best pesticide for aphids?",
            answer: "Neem oil is a great organic option. For severe infestations, you can use Imidacloprid (consult local guidelines). Ladybugs are also natural predators of aphids."
        },
        {
            question: "When to harvest sugarcane?",
            answer: "Harvest sugarcane when the lower leaves dry up and the cane makes a metallic sound when tapped. Usually 10-14 months after planting depending on variety."
        },
        {
            question: "How to test soil pH?",
            answer: "You can use a DIY kit or send a sample to a lab. A simple home test involves mixing soil with vinegar (bubbles = alkaline) or baking soda (bubbles = acidic)."
        },
        {
            question: "What is the best time to sow Cotton?",
            answer: "Cotton is best sown in May-June for irrigated fields and with the onset of monsoon (June-July) for rainfed areas."
        }
    ]
};

// ... (initChat and other functions remain same until handleUserMessage)

function handleUserMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim().toLowerCase();

    if (text) {
        appendMessage(input.value, 'user-message');
        input.value = '';

        // 1. Check for specific crop keywords if cropData is available
        if (typeof cropData !== 'undefined') {
            const crops = Object.keys(cropData);
            let foundCrop = null;

            for (let crop of crops) {
                if (text.includes(crop) || text.includes(cropData[crop].name.toLowerCase())) {
                    foundCrop = cropData[crop];
                    break;
                }
            }

            if (foundCrop) {
                setTimeout(() => {
                    const response = `
                        <strong>${foundCrop.name} Info:</strong><br>
                        🌱 <strong>Soil:</strong> ${foundCrop.soil}<br>
                        🌡️ <strong>Temp:</strong> ${foundCrop.temp}<br>
                        💧 <strong>Water:</strong> ${foundCrop.water_req}<br>
                        💊 <strong>Fertilizer:</strong> ${foundCrop.fertilizer.npk}<br>
                        💰 <strong>Market Price:</strong> ${foundCrop.market.current}
                    `;
                    appendMessage(response, 'bot-message');
                }, 600);
                return;
            }
        }

        // 2. Check for keywords in local FAQs (simple search)
        const faqMatch = chatData.faqs.find(f => text.includes(f.question.toLowerCase()) || f.question.toLowerCase().includes(text));
        if (faqMatch) {
            setTimeout(() => {
                appendMessage(faqMatch.answer, 'bot-message');
            }, 600);
            return;
        }

        // 3. Fallback generic response
        setTimeout(() => {
            appendMessage("I'm not sure about that specific detail yet. Try asking about 'Rice', 'Wheat', 'Cotton' or check the Farming Dashboard for more info.", 'bot-message');
        }, 800);
    }
}

// ... (initChat and other functions remain same until handleUserMessage)

function initChat() {
    const chatContainer = document.createElement('div');
    chatContainer.innerHTML = `
        <!-- Floating Action Button -->
        <div id="chat-fab" class="chat-fab" onclick="toggleChat()">
            <img src="assets/bot_icon.png" alt="Chatbot">
        </div>

        <!-- Chat Window -->
        <div id="chat-window" class="chat-window" style="display: none;">
            <div class="chat-header">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="assets/bot_icon.png" style="width:30px; height:30px; border-radius:50%; background:white;">
                    <span>FarmBot Helper</span>
                </div>
                <button onclick="toggleChat()" style="background:none; border:none; color:white; font-size:1.2rem; cursor:pointer;">&times;</button>
            </div>
            
            <div class="chat-body" id="chat-body">
                <div class="message bot-message">
                    Hello! I am your AI Farm Assistant. Ask me anything or choose a common question below:
                </div>
                <!-- FAQs will be injected here -->
            </div>

            <div class="chat-footer">
                <input type="text" id="chat-input" placeholder="Type your doubt..." onkeypress="handleKeyPress(event)">
                <button onclick="handleUserMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;

    document.body.appendChild(chatContainer);
    renderFAQs();
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display === 'none') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

function renderFAQs() {
    const chatBody = document.getElementById('chat-body');
    const faqContainer = document.createElement('div');
    faqContainer.className = 'faq-container';

    chatData.faqs.forEach(faq => {
        const btn = document.createElement('button');
        btn.className = 'faq-btn';
        btn.innerText = faq.question;
        btn.onclick = () => askQuestion(faq.question, faq.answer);
        faqContainer.appendChild(btn);
    });

    chatBody.appendChild(faqContainer);
}

function askQuestion(question, answer) {
    appendMessage(question, 'user-message');

    // Simulate thinking delay
    setTimeout(() => {
        appendMessage(answer, 'bot-message');
    }, 500);
}


function handleKeyPress(e) {
    if (e.key === 'Enter') handleUserMessage();
}

function appendMessage(text, className) {
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    if (className === 'bot-message') {
        msgDiv.innerHTML = text; // Allow HTML for bot messages (e.g. bold text)
    } else {
        msgDiv.innerText = text;
    }

    msgDiv.className = `message ${className}`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initChat);
