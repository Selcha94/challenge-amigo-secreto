// Array que almacenará los amigos
let amigos = [];
let alertedFirstName = null;

const amigoInput = document.getElementById("amigo");
const errorMessage = document.getElementById("errorMessage");

amigoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    agregarAmigo();
    event.preventDefault();
  }
});

amigoInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
  this.value = this.value.replace(/\s+/g, " ");

  const partes = this.value.trim().split(" ");
  const primerNombre = partes[0].toLowerCase();

  // Verificar si ya existe un amigo cuyo primer nombre es igual
  const esDuplicado =
    primerNombre !== "" &&
    amigos.some((amigo) => {
      return amigo.nombre.split(" ")[0].toLowerCase() === primerNombre;
    });

  const haIniciadoApellido = partes.length > 1 && partes[1].length > 0;

  if (esDuplicado && !haIniciadoApellido) {
    errorMessage.textContent =
      "El nombre ya se encuentra dentro de la lista! Pruebe agregando un apellido u otra identificacion.";
    this.classList.add("error");
    if (!this.value.includes(" ") && !this.value.endsWith(" ")) {
      this.value = this.value + " ";
    }
  } else {
    errorMessage.textContent = "";
    this.classList.remove("error");
  }
});

// Función para agregar un amigo al array con validaciones
function agregarAmigo() {
  const campoTexto = document.getElementById("amigo");
  const nombreCompleto = campoTexto.value.trim();

  // Validar que el campo no esté vacío
  if (nombreCompleto === "") {
    Swal.fire({
      title: "Error",
      text: "Por favor, asegurese de ingresar un nombre",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  // Verificar que no se añada un nombre que ya se encuentra dentro de la lista de amigos
  if (
    amigos.some(
      (amigo) => amigo.nombre.toLowerCase() === nombreCompleto.toLowerCase()
    )
  ) {
    Swal.fire({
      title: "Nombre ya exitente",
      text: "Este nombre ya existe dentro de la lista de amigos.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  // Array de emojis
  const emojis = [
    "😎",
    "✌️",
    "🌞",
    "😁",
    "😜",
    "🥸",
    "👽",
    "👾",
    "🦄",
    "🎈",
    "🍄",
    "🌚",
  ];
  // Generar un emoji aleatorio
  const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];

  // Agregar el amigo al array
  amigos.push({ nombre: nombreCompleto, emoji: emojiAleatorio });

  // Habilitar el botón de "Reiniciar Sorteo"
  if (amigos.length === 1) {
    const reiniciarButton = document.getElementById("reiniciarButton");
    reiniciarButton.disabled = false; // Habilita el botón
  }

  // Actualizar la lista en el DOM
  actualizarLista();

  // Limpiar el campo de texto
  campoTexto.value = "";
}

/** Función para actualizar la lista de amigos en el DOM */
function actualizarLista() {
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = "";

  // Iterar sobre el array de amigos y agregar cada uno a la lista
  amigos.forEach((amigo, index) => {
    // Crear el elemento de la lista
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.marginBottom = "5px";

    // Crear el ícono de la cruz para eliminar nombre de la lista
    const crossIcon = document.createElement("span");
    crossIcon.textContent = "x";
    crossIcon.style.cursor = "pointer";
    crossIcon.style.marginRight = "10px";

    crossIcon.addEventListener("click", function () {
      Swal.fire({
        title: `¿Desea eliminar a ${amigo.nombre}?`,
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          amigos.splice(index, 1);
          actualizarLista(); // Actualizar la lista después de eliminar
          Swal.fire(
            "Eliminado",
            `${amigo.nombre} ha sido eliminado`,
            "success"
          );
        }
      });
    });

    // Crear un span para mostrar el nombre y emoji
    const span = document.createElement("span");
    span.textContent = `${amigo.nombre} ${amigo.emoji}`;

    li.appendChild(crossIcon);
    li.appendChild(span);

    listaAmigos.appendChild(li);
  });

  listaAmigos.style.display = "block";
}

/** Función para seleccionar un amigo de forma aleatoria */
function sortearAmigo() {
  if (amigos.length === 0) {
    alert("No hay amigos en la lista para sortear.");
    return;
  }
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  // Eliminar el amigo sorteado del array
  amigos.splice(indiceAleatorio, 1);

  // Ocultar la lista de amigos
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.style.display = "none";

  // Mostrar el resultado del sorteo
  const resultado = document.getElementById("resultadoSorteo");
  resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado.nombre} ${amigoSorteado.emoji}</strong> 🎉`;

  // Habilitar el botón de "Reiniciar Sorteo"
  const reiniciarButton = document.getElementById("reiniciarButton");
  reiniciarButton.disabled = false; // Habilita el botón
}

/** Función para reiniciar el sorteo */
function reiniciarSorteo() {
  amigos.length = 0;
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = "";
  listaAmigos.style.display = "none";
  const resultado = document.getElementById("resultadoSorteo");
  resultado.innerHTML = "";

  // Deshabilitar el botón de "Reiniciar Sorteo"
  const reiniciarButton = document.getElementById("reiniciarButton");
  reiniciarButton.disabled = true;

  alert("El sorteo ha sido reiniciado.");
}
