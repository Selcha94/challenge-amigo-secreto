# Amigo Secreto

Una aplicación web para organizar el juego del Amigo Secreto. Esta herramienta te permite agregar nombres de amigos, detectar nombres duplicados en tiempo real, sortear un amigo de forma aleatoria y reiniciar el juego automáticamente.

## Funcionalidades

- **Agregar amigos:**  
  Ingresa nombres mediante el campo de texto (con validación en tiempo real para evitar duplicados y permitir agregar apellidos).

- **Sorteo aleatorio:**  
  Selecciona un amigo al azar y lo elimina de la lista, mostrando el resultado con un emoji.

- **Reinicio automático:**  
  Si se sortean todos los nombres, la aplicación muestra un mensaje indicando que el juego se reiniciará automáticamente en 3 segundos.

- **Alertas modernas:**  
  Todas las notificaciones y confirmaciones se muestran usando SweetAlert2 para una experiencia de usuario no invasiva.

- **Botones dinámicos:**  
  Los botones "Sortear Amigo" y "Reiniciar Sorteo" se habilitan o deshabilitan automáticamente según el estado de la lista.

## Tecnologías Utilizadas

- **HTML5:** Estructura de la aplicación.
- **CSS3:** Estilos y diseño, utilizando Flexbox y variables CSS.
- **JavaScript:** Lógica y funcionalidad.
- **SweetAlert2:** Alertas y confirmaciones elegantes.
- **FontAwesome:** Íconos para botones.

## Cómo Empezar

### Prerrequisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari).
- Conexión a Internet (para cargar Google Fonts, SweetAlert2 y FontAwesome).

### Instalación

1. Clona o descarga este repositorio en tu equipo.
2. Abre el archivo `index.html` en tu navegador.

## Uso

1. **Agregar amigos:**  
   Escribe un nombre en el campo y presiona *Enter* o haz clic en el botón **Añadir**.  
   El sistema validará el nombre y, si es duplicado (al menos en el primer nombre), te pedirá que agregues un apellido.

2. **Sortear amigo:**  
   Una vez que tengas al menos un amigo en la lista, el botón **Sortear Amigo** se habilitará. Al hacer clic, se selecciona un amigo al azar, se muestra el resultado y se elimina de la lista.

3. **Reinicio automático:**  
   Si se sortean todos los amigos, aparecerá un mensaje indicando que el juego se reiniciará automáticamente en 3 segundos.  
   También puedes usar el botón **Reiniciar Sorteo** para reiniciar manualmente.


## Captura de Pantalla
![Captura web_13-2-2025_142918_127 0 0 1](https://github.com/user-attachments/assets/a94683d8-bff9-4513-8407-6b20511b7037)


## Mejoras futuras

* Persistencia de la lista utilizando almacenamiento local.

* Permitir que el usuario edite los nombres ya agregados en la lista, en caso de errores o cambios.

* Guardar los resultados de los sorteos para que el usuario pueda consultarlos posteriormente o para evitar repetir asignaciones.

* Ajustar la interfaz para que se vea y funcione bien en dispositivos móviles, posiblemente implementando un diseño responsive.

