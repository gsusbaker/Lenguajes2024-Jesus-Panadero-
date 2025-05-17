const zona = document.getElementById("zona-interactiva");
const lista = document.getElementById("lista-eventos");
const circulo = document.getElementById("circulo");

// Registrar evento en la lista con hora
function registrar(mensaje) {
    const item = document.createElement("li");
    const hora = new Date().toLocaleTimeString();
    item.textContent = `[${hora}] ${mensaje}`;
    lista.appendChild(item);
    lista.scrollTop = lista.scrollHeight;
}

// Limpiar historial de eventos
function limpiarHistorial() {
    lista.innerHTML = "";
    registrar("Historial limpiado");
}

// Eventos generales
window.addEventListener("load", () => registrar("La página se ha cargado"));
window.addEventListener("resize", () => registrar("La ventana ha cambiado de tamaño"));
zona.addEventListener("mouseenter", () => registrar("Cursor entró en la zona"));
zona.addEventListener("mouseleave", () => registrar("Cursor salió de la zona"));
zona.addEventListener("click", () => registrar("Click en la zona"));

// Arrastre del círculo
circulo.addEventListener("dragstart", (e) => {
    registrar("Círculo comenzó a ser arrastrado");
    e.dataTransfer.setData("text/plain", "circulo");
});

// Permitir soltar dentro de la zona
zona.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necesario para permitir drop
});

zona.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "circulo") {
        zona.appendChild(circulo); // Devuelve el círculo a la zona
        registrar("Círculo soltado dentro de la zona");
    }
});

// Si se suelta fuera de la zona
document.body.addEventListener("drop", (e) => {
    const data = e.dataTransfer.getData("text/plain");
    const droppedInside = zona.contains(e.target);

    if (data === "circulo" && !droppedInside) {
        document.body.appendChild(circulo); // Devolverlo al body
        registrar("Círculo soltado fuera de la zona");
    }
});
