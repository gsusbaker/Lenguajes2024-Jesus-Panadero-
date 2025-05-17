// stopPropagation
document.getElementById("padre").addEventListener("click", () => {
    alert("Clic en PADRE");
    console.log("Clic en PADRE");
});

document.getElementById("hijo1").addEventListener("click", (e) => {
    e.stopPropagation();
    alert("Clic en HIJO 1 (con stopPropagation)");
    console.log("Clic en HIJO 1 (con stopPropagation)");
});

document.getElementById("hijo2").addEventListener("click", () => {
    alert("Clic en HIJO 2 (sin stopPropagation)");
    console.log("Clic en HIJO 2 (sin stopPropagation)");
});

// preventDefault
let desactivado = true;
const enlace = document.getElementById("enlace");
const toggle = document.getElementById("toggle-enlace");

toggle.addEventListener("click", () => {
    desactivado = !desactivado;
    alert(`Enlace ${desactivado ? "desactivado" : "activado"}`);
});

enlace.addEventListener("click", (e) => {
    if (desactivado) {
        e.preventDefault();
        alert("Navegación cancelada por preventDefault()");
        console.log("preventDefault() evitó seguir el enlace");
    }
});
