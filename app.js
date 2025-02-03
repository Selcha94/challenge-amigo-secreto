// Array que almacenará los nombres de los amigos ingresados por el usuario
let amigos = [];

// Función que permitirá al usuario agregar nombres de amigos y añadirlos al array
function agregarAmigo(){
    const campoTexto = document.getElementById('amigo');
    const nombreCompleto = campoTexto.value.trim();

    // Validar que el campo no esté vacío
    if (nombreCompleto === ''){
        alert('Por Favor, ingrese un nombre');
        return;
    }
    //Valida que el nombre ingresado no sea mayor de 20 caracteres
    if(nombreCompleto.length > 20){
        alert('El nombre es demasiado largo. Por favor, ingrese un nombre y apellido más corto.');
        return;
    }

    //Validar que no se agregue un nombre similar 
    if (amigos.some(amigo => amigo.nombre.toLowerCase() === nombreCompleto.toLowerCase())) {
        alert('Este nombre ya existe en la lista.');
        return;
    }

    // Array de emojis
    const emojis = ['😎','✌️','🌞','😁','😜','🥸','👽','👾','🦄','🎈','🍄','🌚'];

    // Generar un emoji aleatorio
    const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];

    // Agregar el nombre y el emoji al array (como un objeto)
    amigos.push({ nombre: campoTexto.value.trim(), emoji: emojiAleatorio });

    // Actualizar la lista en el DOM
    actualizarLista();

    // Limpiar el campo de texto
    campoTexto.value = '';
}

/** Función para actualizar la lista de amigos en el DOM */
function actualizarLista(){
    const listaAmigos = document.getElementById('listaAmigos');

    // Limpiar lista existente
    listaAmigos.innerHTML = '';

    // Iterar sobre el array y agregar cada amigo a la lista
    amigos.forEach((amigo, index) => {
        const nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = `${amigo.nombre} ${amigo.emoji}`;
        nuevoElemento.style.cursor = 'pointer';
        nuevoElemento.title='Haz click para eliminar';

    //Agregar evento para eliminar amigo al hacer click
    nuevoElemento.addEventListener("click",() => {
        if(confirm(`¿Estàs seguro que desear eliminar a ${amigo.nombre}?`)){
            // Eliminar el amigo ussando su ìndice y actualizar la lista
            amigos.splice(index, 1);
            actualizarLista();
        }   
    });
    listaAmigos.appendChild(nuevoElemento);
    });
    listaAmigos.style.display = 'block';
}

/** Función para seleccionar un amigo de forma aleatoria */
function sortearAmigo(){
    // Validar que haya amigos dentro del array
    if (amigos.length === 0){
        alert('No hay amigos en la lista para sortear.');
        return;
    }
    // Índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    // Obtener el objeto del amigo sorteado
    const amigoSorteado = amigos[indiceAleatorio];

    // Eliminar el amigo sorteado del array
    amigos.splice(indiceAleatorio, 1);

    // Mostrar el resultado en el DOM
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.style.display = 'none'; 

    const resultado = document.getElementById('resultadoSorteo');
    resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado.nombre} ${amigoSorteado.emoji}</strong> 🎉`;
}

/** Función para Reiniciar el Sorteo */
function reiniciarSorteo(){ 
    // Vaciar el array de amigos
    amigos.length = 0;

    // Limpiar la lista de amigos en el DOM 
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    listaAmigos.style.display = 'none';

    // Limpiar el resultado del sorteo
    const resultado = document.getElementById('resultadoSorteo');
    resultado.innerHTML = '';

    alert('El sorteo ha sido reiniciado.');
}

 