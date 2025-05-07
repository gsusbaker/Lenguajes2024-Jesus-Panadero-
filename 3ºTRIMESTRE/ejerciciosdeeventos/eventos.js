const perro = document.getElementById("perro");  // Se cambió de unicornio a perro
const destinos = document.querySelectorAll(".destino");
const mensaje = document.getElementById("mensaje");
const zonaInicial = document.getElementById("zona-inicial");

perro.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "perro");  // Cambié la data transfer a perro
});

destinos.forEach(destino => {
  destino.addEventListener("dragover", (e) => {
    e.preventDefault();  // Permite que el destino acepte el drag
  });

  destino.addEventListener("drop", (e) => {
    e.preventDefault();
    destino.appendChild(perro);  // Coloca el perro en el destino
    perro.classList.add("perro-centro");  // Añadir clase para posicionar el perro

    // Cambiar el mensaje dependiendo del destino
    const lugar = destino.dataset.lugar;
    mensaje.textContent = `¡Me voy a ${lugar}!`;  // Actualizar mensaje
  });
});
