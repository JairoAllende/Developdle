const PALABRAS = ["HTML", "CSS", "JAVASCRIPT", "JAVA", "REACT"];
const cuadricula = document.getElementById("cuadricula");
const filasDeCuadricula = Array.from(cuadricula.children);
let contador = 0;
let palabraAleatoria = PALABRAS[generarNumeroAleatorio(0,PALABRAS.length - 1)];
let ultimoInputActivo = null;
let botonContinuar = null;
let cartel = null; 
let puntosSumados = 0;
let puntosTotales = 0;

function generarNumeroAleatorio (min , max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function crearCuadrados(fila){
    for (let i = 0; i < palabraAleatoria.length; i++) {
        let cuadrado = document.createElement("input");
        
        if(i == 0){
            cuadrado.setAttribute("autofocus", "true");
        }

        cuadrado.setAttribute("maxlength", "1");
        cuadrado.classList.add("cuadrado");
        cuadrado.addEventListener("input", (event) => {
            event.target.value = event.target.value.toUpperCase();
        })

        fila.appendChild(cuadrado);
    }
}

function desactivarFilasInicio(inputs,fila){
    if (fila !== filasDeCuadricula[0]) {
            
        inputs.forEach((input) => {
            input.setAttribute("readonly", "true");
            input.classList.add("cuadrado-desactivado");
        });
    }
}

function insertarCuadrados(){
    filasDeCuadricula.forEach((fila) => {
        crearCuadrados(fila);
    
        const inputs = Array.from(fila.querySelectorAll("input"));

        desactivarFilasInicio(inputs, fila);
    });
}

insertarCuadrados();

function restringirCaracteres(){
    const cuadrados = document.querySelectorAll(".cuadrado");
    
    cuadrados.forEach((cuadrado) => {
        cuadrado.addEventListener("input", (cambiarCuadrado) => {
            const cuadradoActual = cambiarCuadrado.target;
            if(cuadradoActual.value.charCodeAt(0) < 65 || cuadradoActual.value.charCodeAt(0) > 90){
                cuadradoActual.value = "";
            }
        })
     
    })
}

restringirCaracteres();

function cambiarDeCuadrado(){
    const cuadrados = document.querySelectorAll(".cuadrado");

    cuadrados.forEach((cuadrado) => {
        cuadrado.addEventListener("input", (cambiarCuadrado) => {
            const cuadradoActual = cambiarCuadrado.target;
            
            if(cuadradoActual.value !== ""){
                const indiceActual = Array.from(cuadrados).indexOf(cuadradoActual);

                if(indiceActual > -1 &&  indiceActual < cuadrados.length -1){
                    Array.from(cuadrados)[indiceActual + 1].focus();
                }

            }
        })
        
    })
}

function retrosederCuadrados(){
    const cuadrados = document.querySelectorAll(".cuadrado");

    cuadrados.forEach((cuadrado) =>{
        cuadrado.addEventListener("keydown", (event) =>{
            if(event.key === "Backspace" && !cuadrado.value){
                const indiceActual = Array.from(cuadrados).indexOf(cuadrado);

                if(indiceActual > 0){
                    cuadrados[indiceActual - 1].focus();
                }
            }
        })
    })
}

cambiarDeCuadrado();
retrosederCuadrados();

document.querySelectorAll(".cuadrado").forEach((cuadrado) => {
    cuadrado.addEventListener("focus", (event) => {
        ultimoInputActivo = event.target;
    });
});

function verificarLetras(filaActual, palabraActual) {
    const botonesTeclado = document.querySelectorAll(".botones");

    filaActual.forEach((letra, indice) => {
        
        if(letra.value === palabraActual[indice]) {
            filaActual[indice].classList.add("cuadrado-verde");
            botonesTeclado.forEach((boton) => {
                if(boton.textContent === letra.value){
                    boton.classList.remove("cuadrado-amarillo");
                    boton.classList.add("cuadrado-verde"); 
                }
            });
        }else if(palabraActual.includes(letra.value)) {
            filaActual[indice].classList.add("cuadrado-amarillo");
            botonesTeclado.forEach((boton) => {
                if(boton.textContent === letra.value && !boton.classList.contains("cuadrado-verde")) {
                    boton.classList.add("cuadrado-amarillo");
                }
            });
        }else{
            filaActual[indice].classList.add("cuadrado-gris");
            botonesTeclado.forEach((boton) => {
                if(boton.textContent === letra.value){
                    boton.classList.add("cuadrado-gris");
                }
            });
        }
    });
}

function crearCartel(){
   cartel = document.createElement("div");
   cartel.classList.add("cartel");

   const contenedorMensaje = document.createElement("div");
   const mensaje = document.createElement("h3");
   contenedorMensaje.appendChild(mensaje);
   mensaje.textContent = "Capo!";
   cartel.appendChild(contenedorMensaje);

   const emote = document.createTextNode("👌");
   contenedorMensaje.appendChild(emote);

   const contenedorPuntaje = document.createElement("div");
   const puntajeActual = document.createElement("h3");
   puntajeActual.textContent = `+ ${puntosSumados} puntos`;
   contenedorPuntaje.appendChild(puntajeActual);
   cartel.appendChild(contenedorPuntaje);

   const puntajeTotal = document.createElement("h3");
   puntajeTotal.textContent = "Puntaje total: ";
   contenedorPuntaje.appendChild(puntajeTotal);

   botonContinuar = document.createElement("button");
   botonContinuar.classList.add("boton-cartel");
   botonContinuar.textContent = "Continuar";
   cartel.appendChild(botonContinuar);

   document.body.appendChild(cartel); 
}

function reiniciarJuego(){
    botonContinuar.addEventListener("click", (e)=>{
        if(e.target){
            cuadricula.style.display = "flex";
            cartel.style.removeProperty("display");
            cartel.style.display = "none";
        }

        document.querySelectorAll(".cuadrado").forEach((e) => {
            console.log(e);
            e.classList.remove("cuadrado-verde", "cuadrado-amarillo", "cuadrado-gris","cuadrado-desactivado");
            e.value = "";
            e.removeAttribute("readonly");
        }) //// 
    })
}

function mostrarCartel(){
    cuadricula.style.removeProperty("display");
    cuadricula.style.display = "none";
    crearCartel();

    reiniciarJuego();
}

function palabraEncontrada(filaActual, palabraActual) {
    let letrasCorrectas = 0;

    filaActual.forEach((letra, indice) => {
        if (letra.value === palabraActual[indice]) {
            letrasCorrectas++;
        }
    });

    if(letrasCorrectas === palabraActual.length) {
        filasDeCuadricula.forEach((input) => {
            input.setAttribute("readonly", "true");
            input.classList.add("cuadrado-desactivado");
        });

        switch (filasDeCuadricula[contador].id) {
            case "primera-fila":
                puntosSumados = 60;
                break;
            case "segunda-fila":
                puntosSumados = 50;
                break;
            case "tercera-fila":
                puntosSumados = 40;
                break;
            case "cuarta-fila":
                puntosSumados = 30;
                break;
            case "quinta-fila":
                puntosSumados = 20;
                break;
            case "sexta-fila":
                puntosSumados = 10;
                break;  
            default:
                break;
            }

            mostrarCartel(); //Recibir parametro para poder diferenciar cuando se adivino la palabra y cuando NO, asi poder mostrar el cartel indicando cual era la palabra
            return true;
        }

    return false;
}

function habilitarFilas(){
    let filaActual = Array.from(filasDeCuadricula[contador].children);
    let filaSiguiente = null;
    let palabraActual = Array.from(palabraAleatoria);
    
    let palabraEsCorrecta = palabraEncontrada(filaActual, palabraActual);

    if(filaActual.length === filaActual.filter((elem) => elem.value != "").length){
        filaActual.forEach((input) => {
            input.setAttribute("readonly", "true"); 
            input.classList.add("cuadrado-desactivado");
            verificarLetras(filaActual, palabraActual);
        })
    
        if(contador < filasDeCuadricula.length && contador != filasDeCuadricula.length - 1 && palabraEsCorrecta == false){
            filaSiguiente = Array.from(filasDeCuadricula[contador + 1].children);
    
            if(filaSiguiente){
                filaSiguiente.forEach((input) => {
                    input.removeAttribute("readonly", "true");
                    input.classList.remove("cuadrado-desactivado");
                })
            }
            
        }
        contador++;
    }
}

function botonConfirmar(){
    window.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            if(filasDeCuadricula[contador]){
                habilitarFilas();
            }
        }
    })
}

function manejarTecladoVirtual() {
    const teclado = document.querySelector("#teclado");
    const cuadrados = Array.from(document.querySelectorAll(".cuadrado"));
    
    teclado.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON" && event.target.id !== "boton-delete" && event.target.id !== "boton-enter") {
            event.preventDefault();
            const letra = event.target.innerText; 

            if (ultimoInputActivo && !ultimoInputActivo.hasAttribute("readonly")) {
                ultimoInputActivo.value = letra;
                const indiceActual = cuadrados.indexOf(ultimoInputActivo);

                if (indiceActual > -1 && indiceActual < cuadrados.length - 1) {
                    cuadrados[indiceActual + 1].focus();
                }
            }
        }else if(event.target.id === "boton-delete" && ultimoInputActivo.value === ""){   
            const indiceActual = cuadrados.indexOf(ultimoInputActivo);

            if(indiceActual > 0 && indiceActual < cuadrados.length -1){
                cuadrados[indiceActual - 1].focus();
                ultimoInputActivo.value = "";
            }else if(indiceActual === 0){
                cuadrados[indiceActual].focus();
            }
        }else if(event.target.id === "boton-enter"){
            if(filasDeCuadricula[contador]){  
                habilitarFilas();
            }
        }
    });
}

manejarTecladoVirtual();
botonConfirmar();