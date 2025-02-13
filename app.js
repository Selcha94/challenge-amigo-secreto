// Array que almacenará los amigos
let amigos = [];
let alertedFirstName = null;
let gameStarted = false; // Se activa al agregar el primer nombre

const amigoInput = document.getElementById("amigo");
const errorMessage = document.getElementById("errorMessage");
const sortearButton = document.getElementById("sortearButton");
const reiniciarButton = document.getElementById("reiniciarButton");
const agregarButton = document.getElementById("agregarButton");

// Inicialmente, los botones de sortear y reiniciar están deshabilitados; el de agregar está habilitado
sortearButton.disabled = true;
reiniciarButton.disabled = true;
agregarButton.disabled = false;

// Detectar "Enter" en el input para agregar amigo
amigoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    agregarAmigo();
  }
});

// Validación en tiempo real en el input
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
      "El nombre ya se encuentra dentro de la lista! Pruebe agregando un apellido u otra identificación.";
    this.classList.add("error");
    // Eliminamos la adición forzada de espacio
    // if (!this.value.includes(" ") && !this.value.endsWith(" ")) {
    //   this.value = this.value + " ";
    // }
  } else {
    errorMessage.textContent = "";
    this.classList.remove("error");
  }
});

// Función para actualizar el estado de los botones
function toggleButtons() {
  // Si el juego ya inició y la lista quedó vacía, deshabilitar el botón de "Añadir"
  if (gameStarted && amigos.length === 0) {
    agregarButton.disabled = true;
  } else {
    agregarButton.disabled = false;
  }
  // El botón de sortear se habilita solo si hay al menos un amigo
  sortearButton.disabled = amigos.length === 0;
  // El botón de reiniciar se habilita si el juego ya inició (aunque la lista esté vacía, para reiniciar)
  reiniciarButton.disabled = !gameStarted;
}

// Función para agregar un amigo al array con validaciones
function agregarAmigo() {
  const campoTexto = document.getElementById("amigo");
  const nombreCompleto = campoTexto.value.trim();

  // Validar que el campo no esté vacío
  if (nombreCompleto === "") {
    Swal.fire({
      title: "Error",
      text: "Por favor, asegúrese de ingresar un nombre",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  // Verificar que no se añada un nombre ya existente
  if (
    amigos.some(
      (amigo) => amigo.nombre.toLowerCase() === nombreCompleto.toLowerCase()
    )
  ) {
    Swal.fire({
      title: "Nombre ya existente",
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

  // Agregar el amigo al array (como objeto con nombre y emoji)
  amigos.push({ nombre: nombreCompleto, emoji: emojiAleatorio });

  // Si es el primer amigo agregado, marcar que el juego inició
  if (!gameStarted) {
    gameStarted = true;
  }

  // Actualizar la lista en el DOM y el estado de los botones
  actualizarLista();
  toggleButtons();

  // Limpiar el campo de texto
  campoTexto.value = "";
}

/** Función para actualizar la lista de amigos en el DOM */
function actualizarLista() {
  const listaAmigos = document.getElementById("listaAmigos");
  listaAmigos.innerHTML = "";

  // Iterar sobre el array de amigos y agregar cada uno a la lista
  amigos.forEach((amigo, index) => {
    const li = document.createElement("li");
    li.classList.add("list-item");

    // Crear el ícono de la cruz para eliminar (estilizado)
    const crossIcon = document.createElement("span");
    crossIcon.textContent = "✖";
    crossIcon.classList.add("delete-icon");

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
          actualizarLista();
          toggleButtons();
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
    span.classList.add("name-text");

    li.appendChild(crossIcon);
    li.appendChild(span);
    listaAmigos.appendChild(li);
  });

  // Mostrar u ocultar la lista según corresponda
  listaAmigos.style.display = amigos.length > 0 ? "block" : "none";
  toggleButtons();
}

/** Función para seleccionar un amigo de forma aleatoria */
function sortearAmigo() {
  if (amigos.length === 0) {
    Swal.fire("Error", "No hay amigos en la lista para sortear.", "warning");
    return;
  }
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  // Eliminar el amigo sorteado del array
  amigos.splice(indiceAleatorio, 1);

  // Mostrar el resultado del sorteo
  const resultado = document.getElementById("resultadoSorteo");
  resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado.nombre} ${amigoSorteado.emoji}</strong> 🎉`;

  actualizarLista();
  toggleButtons();

  // Si la lista queda vacía, mostrar mensaje y reiniciar automáticamente en 3 segundos
  if (amigos.length === 0) {
    resultado.innerHTML += `<p class="auto-restart-message">El juego se reiniciará automáticamente en 3 segundos...</p>`;
    setTimeout(function () {
      reiniciarSorteo(true);
    }, 3000);
  }
}

/** Función para reiniciar el sorteo */
function reiniciarSorteo(auto = false) {
  amigos.length = 0;
  document.getElementById("listaAmigos").innerHTML = "";
  document.getElementById("listaAmigos").style.display = "none";
  document.getElementById("resultadoSorteo").innerHTML = "";

  gameStarted = false;
  toggleButtons();

  if (!auto) {
    Swal.fire("Reiniciado", "El sorteo ha sido reiniciado.", "success");
  }
}
