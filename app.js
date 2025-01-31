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
        nuevoElemento.textContent = `${amigo}😎`;
        listaAmigos.appendChild(nuevoElemento);
     });
     listaAmigos.style.display = 'block';
}

/** Funcion para seleneccionar un amigo de forma aleatoria */
function sortearAmigo(){
    //Validar que haya amigos dentro del array
    if (amigos.length === 0){
        alert('No hay amigos en la lista para sortear.');
        return;
    }
    //Indice Aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    //Obtener el nombre del amigo sorteado
    const amigoSorteado = amigos[indiceAleatorio];

    //Eliminar el amigo sorteado del array
    amigos.splice(indiceAleatorio,1);

    //Mostrar el resultado en el DOM
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.style.display ='none'; //ocultar la lista

    const resultado = document.getElementById('resultadoSorteo');
    resultado.innerHTML = `Amigo sorteado: <strong>${amigoSorteado}</strong>🎉`;
}

/** Funcion para Reiniciar el Sorteo */
function reiniciarSorteo(){ 
    //Vaciar el array de amigos
    amigos.length = 0;

    //Limpiar la lista de amigos en el DOM 
    const listaAmigos = document.getElementById ('listaAmigos');
    listaAmigos.innerHTML = '';
    listaAmigos.style.display = 'none';

    //Limpiar el resultado del sorteo
    const resultado = document.getElementById('resultadoSorteo');
    resultado.innerHTML = '';

    alert('El sorteo ha sido reiniciado.');
}



 