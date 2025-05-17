function procesarCadena() {
  const texto = document.getElementById("cadena").value;
  document.getElementById("original").textContent = texto;
  document.getElementById("longitud").textContent = texto.length;
  document.getElementById("palabras").textContent = texto.trim().split(/\s+/).length;
  document.getElementById("mayus").textContent = texto.toUpperCase();
  document.getElementById("minus").textContent = texto.toLowerCase();
  document.getElementById("capital").textContent = texto
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
  document.getElementById("primero").textContent = texto.charAt(0);
  document.getElementById("ultimo").textContent = texto.charAt(texto.length - 1);
  document.getElementById("concat").textContent = texto.concat(" JS");
  document.getElementById("incluye").textContent = texto.includes("a") ? "Sí" : "No";
  document.getElementById("reemplazo").textContent = texto.replace(/a/g, "@");
  document.getElementById("subcadena").textContent = texto.slice(0, 5);
}
