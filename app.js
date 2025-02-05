// Array que almacenará los amigos (cada uno es un objeto con nombre y emoji)
let amigos = [];
// Variable para recordar el primer nombre para el que ya se mostró el alerta
let alertedFirstName = null;

// Seleccionar el input de nombre
const amigoInput = document.getElementById('amigo');

amigoInput.addEventListener('input', function() {
  // Permitir solo letras (incluyendo acentos y ñ) y espacios
  this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
  // Normalizar espacios: reemplazar múltiples espacios por uno solo
  this.value = this.value.replace(/\s+/g, ' ');

  // Separar el texto en palabras
  const partes = this.value.trim().split(' ');
  const primerNombre = partes[0].toLowerCase();

  // Si solo se ha escrito el primer nombre (sin apellido)
  if (partes.length === 1) {
    // Si el primer nombre ya existe en la lista de amigos
    if (primerNombre !== '' && amigos.some(amigo => amigo.nombre.split(' ')[0].toLowerCase() === primerNombre)) {
      // Mostrar alerta y agregar clase error solo una vez para este primer nombre duplicado
      if (alertedFirstName !== primerNombre) {
        alert("El primer nombre ya existe, ingrese un apellido u otra identificacion.");
        alertedFirstName = primerNombre;
      }
      // Agregar un espacio al final (si aún no lo tiene) para permitir escribir el apellido
      if (!this.value.endsWith(' ')) {
        this.value = this.value + ' ';
      }
      // Marcar el input con la clase error
      this.classList.add('error');
    } else {
      // Si no hay duplicado, quitar la clase error y reiniciar la variable de alerta
      this.classList.remove('error');
      alertedFirstName = null;
    }
  } else if (partes.length > 1 && partes[1].length > 0) {
    // Si ya se ha iniciado a escribir el apellido
    // Se quita la clase error para que el texto vuelva a verse de color negro
    this.classList.remove('error');
    alertedFirstName = null;
  }
});


// Función para agregar un amigo al array con validaciones
function agregarAmigo() {
  const campoTexto = document.getElementById('amigo');
  const nombreCompleto = campoTexto.value.trim();

  // Validar que el campo no esté vacío
  if (nombreCompleto === '') {
    alert('Por favor, ingrese un nombre');
    return;
  }

  // Validar que el nombre no sea demasiado largo (máximo 20 caracteres)
  if (nombreCompleto.length > 20) {
    alert('El nombre es demasiado largo. Por favor, ingrese un nombre y apellido más corto.');
    return;
  }

  // Validar que no se agregue un nombre similar al añadido a la lista
  if (amigos.some(amigo => amigo.nombre.toLowerCase() === nombreCompleto.toLowerCase())) {
    alert('Este nombre ya existe en la lista.');
    return;
  }

  // Array de emojis
  const emojis = ['😎','✌️','🌞','😁','😜','🥸','👽','👾','🦄','🎈','🍄','🌚'];
  // Generar un emoji aleatorio
  const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];

  // Agregar el amigo al array
  amigos.push({ nombre: nombreCompleto, emoji: emojiAleatorio });

  // Actualizar la lista en el DOM
  actualizarLista();

  // Limpiar el campo de texto
  campoTexto.value = '';
}

/** Función para actualizar la lista de amigos en el DOM */
function actualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; 

    // Iterar sobre el array de amigos y agregar cada uno a la lista
    amigos.forEach((amigo, index) => {
      // Crear el elemento de la lista
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.marginBottom = '5px';
  
      // Crear el ícono de la cruz para eliminar nombre de la lista
      const crossIcon = document.createElement('span');
      crossIcon.textContent = 'x';
      crossIcon.style.cursor = 'pointer';
      crossIcon.style.marginRight = '10px';
      // Al hacer clic en la cruz, preguntar si se desea eliminar ese amigo
      crossIcon.addEventListener('click', function() {
        if (confirm(`¿Desea eliminar a ${amigo.nombre}?`)) {
          amigos.splice(index, 1);
          actualizarLista();
        }
      });
  
      // Crear un span para mostrar el nombre y emoji
      const span = document.createElement('span');
      span.textContent = `${amigo.nombre} ${amigo.emoji}`;
  
      li.appendChild(crossIcon);
      li.appendChild(span);

      listaAmigos.appendChild(li);
    });
    listaAmigos.style.display = 'block';
}

/** Función para seleccionar un amigo de forma aleatoria */
function sortearAmigo() {
  if (amigos.length === 0) {
    alert('No hay amigos en la lista para sortear.');
    return;
  }
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  // Eliminar el amigo sorteado del array
  amigos.splice(indiceAleatorio, 1);

  // Ocultar la lista de amigos
  const listaAmigos = document.getElementById('listaAmigos');
  listaAmigos.style.display = 'none';

  // Mostrar el resultado del sorteo
  const resultado = document.getElementById('resultadoSorteo');
  resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado.nombre} ${amigoSorteado.emoji}</strong> 🎉`;
}

/** Función para reiniciar el sorteo */
function reiniciarSorteo() {
  amigos.length = 0;
  const listaAmigos = document.getElementById('listaAmigos');
  listaAmigos.innerHTML = '';
  listaAmigos.style.display = 'none';
  const resultado = document.getElementById('resultadoSorteo');
  resultado.innerHTML = '';
  alert('El sorteo ha sido reiniciado.');
}
