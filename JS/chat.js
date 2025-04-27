document.addEventListener("DOMContentLoaded", () => {
    const socket = io("http://192.168.0.7:3000");

    const userList = document.getElementById("user-list");
    const chatHeader = document.getElementById("chat-header");
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const nombreSpan = document.getElementById("NombreUsuario");

    let activeUser = null;
    let chatData = {};
    let currentUser = null;
    let connectedUsers = {};

    const nombreGuardado = localStorage.getItem("usuarioNombre");
    if (nombreSpan && nombreGuardado) {
        nombreSpan.textContent = nombreGuardado;
        currentUser = nombreGuardado.trim().toLowerCase();
        socket.emit("register", currentUser);
    } else {
        alert("No se ha iniciado sesión. Redirigiendo al login...");
        window.location.href = "../HTML/Inicio_sesion.html";
        return;
    }

    socket.on("user list", (users) => {
        connectedUsers = users;
        renderUserList(users);
    });

    function renderUserList(users) {
        userList.innerHTML = `
            <h3>Usuarios <img src="../Imagenes/team.png" class="group-chat-button" /></h3>
        `;

        for (let name in users) {
            if (name === currentUser) continue;

            const userDiv = document.createElement("div");
            userDiv.classList.add("user");
            userDiv.dataset.username = name;
            userDiv.innerHTML = `
                <img src="../Imagenes/1.png" alt="${name}" />
                <span>${name}</span>
            `;
            userList.appendChild(userDiv);
        }
    }

    userList.addEventListener("click", (event) => {
        const userElement = event.target.closest(".user");
        if (!userElement) return;

        activeUser = userElement.dataset.username.toLowerCase();

        chatHeader.innerHTML = "";
        const title = document.createElement("span");
        title.textContent = `Chat con ${activeUser}`;

        const videoCallIcon = document.createElement("img");
        videoCallIcon.src = "../Imagenes/call.png";
        videoCallIcon.alt = "Videollamada";
        videoCallIcon.classList.add("video-call-icon");
        videoCallIcon.addEventListener("click", () => {
            alert(`Iniciando videollamada con ${activeUser}...`);
        });

        chatHeader.appendChild(title);
        chatHeader.appendChild(videoCallIcon);

        renderMessages();
    });

    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        if (!activeUser || !messageInput.value.trim()) return;

        const text = messageInput.value.trim();
        const msgObj = { text, type: "sent", time: new Date().toLocaleTimeString() };

        if (!chatData[activeUser]) chatData[activeUser] = [];
        chatData[activeUser].push(msgObj);
        renderMessages();

        socket.emit("private message", {
            to: activeUser,
            message: text
        });

        messageInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    socket.on("private message", ({ from, message }) => {
        if (!chatData[from]) chatData[from] = [];
        chatData[from].push({ text: message, type: "received", time: new Date().toLocaleTimeString() });

        if (activeUser === from) {
            renderMessages();
        }
    });

    function renderMessages() {
        chatMessages.innerHTML = "";
        if (!chatData[activeUser]) return;

        chatData[activeUser].forEach(msg => {
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("message", msg.type);
            msgDiv.textContent = `${msg.text} (${msg.time})`;
            chatMessages.appendChild(msgDiv);
        });
    }
});

