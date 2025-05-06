function calcularPresupuesto() {
    // Obtener los valores de entrada
    const ancho = parseFloat(document.getElementById('ancho').value);
    const alto = parseFloat(document.getElementById('alto').value);
    const largo = parseFloat(document.getElementById('largo').value);
    const material = document.getElementById('material').value;

    // Obtener los valores de configuración
    const precioBase = parseFloat(document.getElementById('precioBase').value);
    const incrementoPlastico = parseFloat(document.getElementById('incrementoPlastico').value) / 100;
    const incrementoCarton = parseFloat(document.getElementById('incrementoCarton').value) / 100;
    const incrementoMadera = parseFloat(document.getElementById('incrementoMadera').value) / 100;
    const iva = parseFloat(document.getElementById('iva').value) / 100;

    // Validaciones
    if (ancho < 5 || alto < 5 || largo < 5 || ancho > 100 || alto > 100 || largo > 100) {
        alert("Las dimensiones deben estar entre 5 cm y 100 cm.");
        return;
    }
    if (Math.max(ancho, alto, largo) / Math.min(ancho, alto, largo) > 5) {
        alert("La relación entre las dimensiones no puede superar el factor 5.");
        return;
    }

    // Calcular el volumen y la superficie
    const volumen = ancho * alto * largo; // en cm³
    const superficie = 2 * (ancho * alto + ancho * largo + alto * largo); // en cm²

    // Calcular el precio
    let incremento;
    if (material === 'plastico') {
        incremento = incrementoPlastico;
    } else if (material === 'carton') {
        incremento = incrementoCarton;
    } else if (material === 'madera') {
        incremento = incrementoMadera;
    }

    const precioMaterial = precioBase * volumen / 1000000 * (1 + incremento); // en euros
    const precioSinIVA = precioMaterial;
    const precioConIVA = precioMaterial * (1 + iva);

    // Mostrar resultados
    document.getElementById('dimensiones').textContent = `Dimensiones de la caja: ${ancho} x ${alto} x ${largo} cm`;
    document.getElementById('volumen').textContent = `Volumen en cm³: ${volumen}`;
    document.getElementById('superficie').textContent = `Superficie en cm²: ${superficie}`;
    document.getElementById('materialSeleccionado').textContent = `Material seleccionado: ${material.charAt(0).toUpperCase() + material.slice(1)}`;
    document.getElementById('precio').textContent = `Precio con IVA: €${precioConIVA.toFixed(2)}`;
    document.getElementById('precioSinIVA').textContent = `Precio sin IVA: €${precioSinIVA.toFixed(2)}`;
}
