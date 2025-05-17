function contarDivs() {
    const divs = document.querySelectorAll('div.card');
    let conContenido = 0;
    let vacios = 0;

    divs.forEach(div => {
        if (div.textContent.trim().length > 0) {
            conContenido++;
        } else {
            vacios++;
        }
    });

    document.getElementById('totalDivs').innerText = "Total de divs: " + divs.length;
    document.getElementById('conContenido').innerText = "Con contenido: " + conContenido;
    document.getElementById('vacios').innerText = "Vacíos: " + vacios;
}

function modificarClase(nombreClase) {
    const tarjeta = document.getElementById("tarjeta");
    tarjeta.classList.toggle(nombreClase);
}
