let resultado = document.getElementById("resultado");

// Función para agregar números al resultado
function agregarNumero(num) {
    resultado.value += num;
}

// Función para limpiar la pantalla
function limpiar() {
    resultado.value = '';
}

// Función para borrar el último número
function borrar() {
    resultado.value = resultado.value.slice(0, -1);
}

// Función para realizar operaciones (raíz, binario, etc.)
function operar(op) {
    switch (op) {
        case "raiz":
            try {
                resultado.value = Math.sqrt(eval(resultado.value));
            } catch (error) {
                resultado.value = "Error";
            }
            break;
        case "bin":
            try {
                resultado.value = eval(resultado.value).toString(2);
            } catch (error) {
                resultado.value = "Error";
            }
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            resultado.value += op;  // Agrega el operador al valor actual
            break;
        default:
            resultado.value += op;  // Si es otro operador o número, lo añade
            break;
    }
}

// Función para calcular el resultado
function calcular() {
    try {
        resultado.value = eval(resultado.value);  // eval para evaluar la expresión matemática
    } catch (error) {
        resultado.value = "Error";

    }

}
