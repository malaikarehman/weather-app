document.getElementById('send-message').addEventListener('click', function() {
    const userInput = document.getElementById('chat-input').value.trim();
    if (userInput) {
        addMessageToChat(userInput, 'user-message');
        handleBotResponse(userInput);
        document.getElementById('chat-input').value = '';
    }
});

function addMessageToChat(message, className) {
    const chatContent = document.getElementById('chat-content');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function handleBotResponse(userInput) {
    let botResponse = "I'm not sure how to answer that. Please try again.";

    if (userInput.toLowerCase().includes("weather")) {
        botResponse = "Please select a city to get the current weather information.";
    } else if (userInput.toLowerCase().includes("temperature")) {
        botResponse = "The current temperature is displayed in the weather widget above.";
    } else if (userInput.toLowerCase().includes("rain")) {
        botResponse = "If it is raining, don't forget to carry an umbrella!";
    }

    setTimeout(() => {
        addMessageToChat(botResponse, 'bot-message');
    }, 500); // Delay to mimic a real conversation
}
