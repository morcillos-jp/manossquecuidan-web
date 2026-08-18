function mostrarFormulario(tipo) {
  const cuidadores = document.getElementById("panel-cuidadores");
  const pacientes = document.getElementById("panel-pacientes");
  const botones = document.querySelectorAll(".tab-btn");

  if (tipo === "cuidador") {
    cuidadores.classList.remove("oculto");
    pacientes.classList.add("oculto");
    botones[0].classList.add("activo");
    botones[1].classList.remove("activo");
  } else {
    pacientes.classList.remove("oculto");
    cuidadores.classList.add("oculto");
    botones[1].classList.add("activo");
    botones[0].classList.remove("activo");
  }
}

// Al cargar la página, fijarse si vino un tipo específico por la URL
const params = new URLSearchParams(window.location.search);
const tipoInicial = params.get("tipo") || "cuidador";
if (document.getElementById("panel-cuidadores")) {
  mostrarFormulario(tipoInicial);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCTHOkahgpDPXiyEb-6dAckMQ988xwzlluIs5j0YjDqs7sNvOZFxoy3Nd9DL02E5ml/exec";

// Convierte un archivo a base64 para poder enviarlo
function archivoABase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- Formulario de cuidadores ---
const formCuidador = document.getElementById("form-cuidador");

formCuidador.addEventListener("submit", async function (e) {
  e.preventDefault();

  const boton = formCuidador.querySelector("button");
  boton.disabled = true;
  boton.textContent = "Enviando...";

const cvFile = document.getElementById("cv").files[0];
const antecedentesFile = document.getElementById("antecedentes").files[0];
const carnetFile = document.getElementById("carnet").files[0];

const cv = await archivoABase64(cvFile);
const antecedentes = antecedentesFile ? await archivoABase64(antecedentesFile) : "";
const carnet = carnetFile ? await archivoABase64(carnetFile) : "";

  const datos = new URLSearchParams();
  datos.append("tipo", "cuidador");
  datos.append("nombre", document.getElementById("nombre-cuidador").value);
  datos.append("telefono", document.getElementById("telefono-cuidador").value);
  datos.append("email", document.getElementById("email-cuidador").value);
  datos.append("experiencia", document.getElementById("experiencia").value);
  datos.append("cv", cv);
  datos.append("antecedentes", antecedentes);
  datos.append("carnet", carnet);

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: datos
    });
    alert("¡Postulación enviada con éxito!");
    formCuidador.reset();
  } catch (error) {
    alert("Hubo un error al enviar. Probá de nuevo.");
  }

  boton.disabled = false;
  boton.textContent = "Enviar postulación";
});

// --- Formulario de pacientes ---
const formPaciente = document.getElementById("form-paciente");

formPaciente.addEventListener("submit", async function (e) {
  e.preventDefault();

  const boton = formPaciente.querySelector("button");
  boton.disabled = true;
  boton.textContent = "Enviando...";

  const datos = new URLSearchParams();
  datos.append("tipo", "paciente");
  datos.append("nombre", document.getElementById("nombre-paciente").value);
  datos.append("telefono", document.getElementById("telefono-paciente").value);
  datos.append("email", document.getElementById("email-paciente").value);
  datos.append("tipo_cuidado", document.getElementById("tipo-cuidado").value);
  datos.append("zona", document.getElementById("zona").value);
  datos.append("comentarios", document.getElementById("comentarios").value);

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: datos
    });
    alert("¡Consulta enviada con éxito!");
    formPaciente.reset();
  } catch (error) {
    alert("Hubo un error al enviar. Probá de nuevo.");
  }

  boton.disabled = false;
  boton.textContent = "Enviar consulta";
});
