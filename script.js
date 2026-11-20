const chat = document.getElementById("chat");
const input = document.getElementById("message");
const sendBtn = document.getElementById("send");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = sender;
  message.textContent = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Thinking...", "bot");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    chat.lastChild.remove();
    addMessage(data.reply || "Sorry, something went wrong.", "bot");

  } catch (error) {
    chat.lastChild.remove();
    addMessage("Connection error. Please try again.", "bot");
  }
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});