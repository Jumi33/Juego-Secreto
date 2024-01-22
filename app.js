let numeroSecreto = 0; 
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function verificarIntento() {
    //el .getElementById retorna el objeto, para obtener el valor usamos el metodo .value para que retorne el valor
    let numeroUsuario = parseInt(document.getElementById('uno').value);
    console.log(numeroUsuario);
        if (numeroSecreto === numeroUsuario) {
            asignarTextElemento('.texto__parrafo', `¡HAS ACERTADO ${intentos == 1 ? 'EN 1 INTENTO!' : `EN ${intentos} INTENTO!`}`);
            removerAtributo()
        } else {
            if (numeroUsuario < numeroSecreto) {
                asignarTextElemento('.texto__parrafo', '¡El numero secreto es mayor!');
            } else {
                asignarTextElemento('.texto__parrafo', '¡El numero secreto es menor!');
            }
            limpiarCaja();
            mostrarError(intentos);
            intentos++;
            maxIntentos();
            removerAtributo()
        } 
    return;
}

function limpiarCaja() {
   document.querySelector('#uno').value = '';
}

function asignarTextElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Crear numero seudoaleatorio
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextElemento('.texto__parrafo','Ya se sortearon todos los numeros posibles');
        ocultarBotones();
    } else {
        // Para saber si un numero existe dentro de nuestra lista podemos utilizar el metodo .includes al array y dandole como parametro el valor que queremos saber si existe dentro del array
        if (listaNumerosSorteados.includes(numeroGenerado) ){
            // NOTAAAAAA
            // UNA FUNCION PUEDE LLAMARSE A SI MISMA 
            // En este caso para que vuelva a generar otro numero pseudoaleatorio debemos de darle un retorno a la misma funcion para que vuelva a aplicar la generacion del numero
            // Una vez que el numero generado no sea igual al anterior, pasará al else de la condicion    
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            console.log(listaNumerosSorteados);
            return numeroGenerado;
        }
    }
}

//Muestra cuantos errores te quedan
function mostrarError(num) {
    let error = document.getElementById('intentos');
    error.style.display = 'block';
    let intentos = 3 - num
    error.innerHTML = `Te quedan ${intentos} de intentos`;
}

// Oculta los errores al reiniciar el juego
function ocultarError(){
    let error = document.getElementById('intentos');
    error.style.display = 'none';
}

// Remueve atributos al boton de "nuevo juego" 
function removerAtributo() {
    // Para remover un atributo de nuestro html, usamos el metodo .removeAttribute() y indicamos el atributo que queremos remover.
    document.getElementById('reiniciar').removeAttribute('disabled');
}

// Genera el maximo de intentos por juego, tambien quita el boton de intentar
function maxIntentos() {
    if (intentos > 3){
        asignarTextElemento('.texto__parrafo', 'GAME OVER')
        document.querySelector('.container__boton').style.display = 'none';

    }
}

// Hace visible el boton intentar, despues de hacer el reinicio
function reseteo() {
    document.querySelector('.container__boton').style.display = 'block';
}

// Reinicia el juego al encontrar el numero o quedarse sin intentos 
function reiniciarJuego(){
    // Limpiar caja
    limpiarCaja();

    condicionesIniciales();

    // Para volver a ocultar el reiniciar tenemos que usar el metodo setAttribute y darle la condicion true
    document.querySelector('#reiniciar').setAttribute('disabled',true);

    ocultarError();

    reseteo();

}

// Establece las condiciones iniciales del juego
function condicionesIniciales(){
    asignarTextElemento('h1', 'Adivina el número secreto');
    asignarTextElemento('.texto__parrafo', 'Ingresa un numero entre 1 y 10');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1; 
}

// Ocultar ambos botones
function ocultarBotones() {
    document.querySelector('#reiniciar').setAttribute('disabled',true);
    document.querySelector('.container__boton').setAttribute('disabled',true);
}

condicionesIniciales();



