// tetris.js

const piezas = document.querySelectorAll('.pieza');
const tabla = document.querySelector('.zona-derecha');
const tablaBody = document.getElementById('tabla-body');
const totalBruto = document.getElementById('total-bruto');
const totalMargen = document.getElementById('total-margen');
const totalIVA = document.getElementById('total-iva');
const totalNeto = document.getElementById('total-neto');
const inputMargen = document.getElementById('margen');
const inputIVA = document.getElementById('iva');
const btnActualizar = document.getElementById('actualizar');
const btnBorrar = document.getElementById('borrar');
const infoPrecios = document.getElementById('historial-piezas');
const btnExportar = document.getElementById('exportar-json');

let precios = {};
let carrito = {};

fetch('precios.json')
  .then(res => res.json())
  .then(data => {
    precios = data;
    mostrarPrecios();
    cargarDesdeLocalStorage();
    actualizarTabla();
  });

function mostrarPrecios() {
  if (!infoPrecios) return;
  infoPrecios.innerHTML = '';

  const tabla = document.createElement('table');
  tabla.style.width = '100%';
  tabla.style.borderCollapse = 'collapse';

  for (const pieza in precios) {
    const fila = document.createElement('tr');

    const celdaImg = document.createElement('td');
    const img = document.createElement('img');
    img.src = `images/${pieza}.png`;
    img.alt = pieza;
    img.style.width = '40px';
    img.style.height = 'auto';
    celdaImg.appendChild(img);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = `${precios[pieza].toFixed(2)} €`;
    celdaPrecio.style.textAlign = 'right';

    fila.appendChild(celdaImg);
    fila.appendChild(celdaPrecio);
    tabla.appendChild(fila);
  }

  infoPrecios.appendChild(tabla);
}

piezas.forEach(pieza => {
  pieza.addEventListener('dragstart', e => {
    e.dataTransfer.setData('pieza', pieza.alt);
  });
});

tabla.addEventListener('dragover', e => e.preventDefault());

tabla.addEventListener('drop', e => {
  e.preventDefault();
  const tipo = e.dataTransfer.getData('pieza');
  if (!tipo || !precios[tipo]) return;

  carrito[tipo] = (carrito[tipo] || 0) + 1;
  actualizarTabla();
});

function actualizarTabla() {
  tablaBody.innerHTML = '';
  let bruto = 0;

  for (const pieza in carrito) {
    const cantidad = carrito[pieza];
    const precio = precios[pieza] || 0;
    const total = cantidad * precio;
    bruto += total;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${pieza}</td>
      <td>${cantidad}</td>
      <td>${total.toFixed(2)} €</td>
    `;
    tablaBody.appendChild(fila);
  }

  const margen = parseFloat(inputMargen.value) || 0;
  const iva = parseFloat(inputIVA.value) || 0;

  const m = bruto * (margen / 100);
  const i = (bruto + m) * (iva / 100);
  const neto = bruto + m + i;

  totalBruto.textContent = `${bruto.toFixed(2)} €`;
  totalMargen.textContent = `${m.toFixed(2)} €`;
  totalIVA.textContent = `${i.toFixed(2)} €`;
  totalNeto.textContent = `${neto.toFixed(2)} €`;

  guardarEnLocalStorage();
}

function guardarEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('margen', inputMargen.value);
  localStorage.setItem('iva', inputIVA.value);
}

function guardarComoJSON() {
  const resumen = {
    piezas: carrito,
    margen: parseFloat(inputMargen.value) || 0,
    iva: parseFloat(inputIVA.value) || 0,
    totalBruto: totalBruto.textContent,
    totalMargen: totalMargen.textContent,
    totalIVA: totalIVA.textContent,
    totalNeto: totalNeto.textContent
  };

  const blob = new Blob([JSON.stringify(resumen, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'presupuesto.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function cargarDesdeLocalStorage() {
  const guardado = localStorage.getItem('carrito');
  if (guardado) carrito = JSON.parse(guardado);
  inputMargen.value = localStorage.getItem('margen') || 0;
  inputIVA.value = localStorage.getItem('iva') || 21;
}

btnActualizar.addEventListener('click', actualizarTabla);
btnBorrar.addEventListener('click', () => {
  carrito = {};
  actualizarTabla();
});
btnExportar.addEventListener('click', guardarComoJSON);