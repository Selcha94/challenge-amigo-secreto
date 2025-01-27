//Array que almacenerà los nombres de los amigos ingresados por el usuario
let amigos = [];
// Función que permitirá al usuario agregar nombres de amigos y añadirlos al array
function agregarAmigo(){
   const campoTexto = document.getElementById('amigo');

//Validar que el campo no estè vacìo
if (campoTexto.value.trim() === ''){
    alert ('Por Favor, ingrese un nombre')
    return;
}
//agregamos el nombre dentro del array
amigos.push(campoTexto.value.trim());

//Actualizar la lista en el DOM
actualizarLista();

 //Limpiar el campo del Texto
 campoTexto.value = '';
}
/**Funcion para actualizar la lista de amigos en el DOM */
function actualizarLista(){
     const listaAmigos = document.getElementById('listaAmigos');

     //Limpiar lista existente
     listaAmigos.innerHTML = '';

     //Iterar sobre el array y agregar cada amigo a la lista
     amigos.forEach((amigo) =>{
        const nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = amigo;
        listaAmigos.appendChild(nuevoElemento);
     });
     listaAmigos.style.display = 'block';
}

/** Funcion para seleneccionar un amigo de forma aleatoria */
function sortearAmigo(){
    //Validar que haya amigos en el array
    if (amigos.length === 0){
        alert('No hay amigos en la lista para sortear.');
        return;
    }
    //Indice Aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    //Obtener el nombre del amigo sorteado
    const amigoSorteado = amigos[indiceAleatorio];

    //Mostrar el resultado en el DOM
    const resultado = document.getElementById('resultadoSorteo');
    resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado}</strong>`;
}




 