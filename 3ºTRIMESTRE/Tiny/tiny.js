// Inicializar TinyMCE
tinymce.init({
  selector: '#editor'
});

// Pasar contenido del editor a div
function pasarTexto() {
  const contenido = tinymce.get("editor").getContent();
  document.getElementById("resultado").innerHTML = contenido;
}

// Generar PDF del div con html2pdf
function generarPDF() {
  const contenido = document.getElementById("resultado");
  html2pdf().from(contenido).save();
}
