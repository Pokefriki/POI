function agregarTarea() {
    let tareaTexto = document.getElementById("tareaInput").value;
    if (tareaTexto.trim() !== "") {
        let li = document.createElement("li");
        li.innerHTML = "📌 " + tareaTexto + ' <button onclick="moverTarea(this)">✔</button>';
        document.getElementById("pendientes").appendChild(li);
        document.getElementById("tareaInput").value = "";
    }
}

function moverTarea(btn) {
    let tarea = btn.parentElement;
    let listaPadre = tarea.parentElement.id;

    if (listaPadre === "pendientes") {
        document.getElementById("completadas").appendChild(tarea);
        tarea.removeChild(btn);
    } 
}