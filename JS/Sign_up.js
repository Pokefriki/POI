document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreIngresado = document.getElementById('nombreUsuario').value.trim();
    const password = document.getElementById('password').value.trim();

    if (nombreIngresado && password) {
        localStorage.setItem("usuarioNombre", nombreIngresado);
        redireccionar_inicio();
    } else {
        alert("Por favor completa todos los campos requeridos.");
    }
});

// Cerrar sesión (llamar esto desde botón de logout)
function cerrarSesion() {
    localStorage.removeItem("usuarioNombre");
    window.location.href = "../HTML/Inicio_sesion.html";
}

function redireccionar_inicio() {
    window.location.href = "../HTML/Chat.html";
}

