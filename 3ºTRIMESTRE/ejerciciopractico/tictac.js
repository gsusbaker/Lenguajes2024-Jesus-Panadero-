let jugador = 1; // La variable jugador controla controla el turno y se guarda en el tablero cuadno hace click
const casillas = document.querySelectorAll(".casilla");

let tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ganador = false;
let turno = "X";

const mensajeTurno = document.getElementById("mensajeTurno");
const botonReiniciar = document.getElementById("reiniciar");
const botonReset = document.getElementById("reset");
const marcador = document.getElementById("marcador");




let combinaciones = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
];

function jugada(num) {
  if (!ganador && tablero[num - 1] === 0) {
    tablero[num - 1] = jugador;
    casillas[num - 1].classList.add("jugador" + jugador);
    if (comprobarGanador()) {
      alert("Jugador " + jugador + " ha ganado");
      ganador = true;
  
    } else if (comprobarEmpate()) {
      alert("Empate");
      ganador = true;
    } else {
      cambiarJugador();
    }
  }
  turno = turno === "X" ? "O" : "X";
  mensajeTurno.textContent = `Turno de: Jugador ${turno}`;
}

function cambiarJugador() {
  jugador = jugador === 1 ? 2 : 1;
}


function comprobarGanador() {
  for (let i = 0; i < combinaciones.length; i++) {
    const combinacion = combinaciones[i];
    let ganador = true;
    for (let j = 0; j < combinacion.length; j++) {
      const casilla = combinacion[j];
      if (tablero[casilla] !== jugador) {
        ganador = false;
        break;
      }
    }
    if (ganador) {
      return true;
    }
  }
  return false;
}


function comprobarEmpate() {
  return !tablero.includes(0);
}
function reiniciarJuego() {
tablero = ["", "", "", "", "", "", "", "", ""];
turno = "X";
mensajeTurno.textContent = `Turno de: Jugador ${turno}`;
casillas.forEach(c => {
  c.textContent = "";
  c.addEventListener("click", manejarClick);
});
}
casillas.forEach(c => c.addEventListener("click", manejarClick));
botonReiniciar.addEventListener("click", reiniciarJuego);