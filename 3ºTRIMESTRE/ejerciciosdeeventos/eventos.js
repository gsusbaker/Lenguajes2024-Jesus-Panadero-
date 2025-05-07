const perro = document.getElementById("perro");  
const destinos = document.querySelectorAll(".destino");
const mensaje = document.getElementById("mensaje");
const zonaInicial = document.getElementById("zona-inicial");

perro.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "perro");  
});

destinos.forEach(destino => {
  destino.addEventListener("dragover", (e) => {
    e.preventDefault(); 
  });

  destino.addEventListener("drop", (e) => {
    e.preventDefault();
    destino.appendChild(perro);  
    perro.classList.add("perro-centro");  

    
    const lugar = destino.dataset.lugar;
    mensaje.textContent = `¡Me voy a ${lugar}!`;  
  });
});
