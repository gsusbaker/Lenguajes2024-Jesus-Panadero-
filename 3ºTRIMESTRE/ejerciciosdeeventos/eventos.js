script.js
const unicornio = document.getElementById("unicornio");
const destinos = document.querySelectorAll(".destino");
const mensaje = document.getElementById("mensaje");
const zonaInicial = document.getElementById("zona-inicial");

unicornio.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "unicornio");
});

destinos.forEach(destino => {
  destino.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  destino.addEventListener("drop", (e) => {
    e.preventDefault();
    destino.appendChild(unicornio);
    unicornio.classList.add("unicornio-centro");

    const lugar = destino.dataset.lugar;
    mensaje.textContent = `¡Me voy a ${lugar}!`;
  });
});