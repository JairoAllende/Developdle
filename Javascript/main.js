const PALABRAS = ["HTML", "CSS", "Javascript"];
const cuadricula = document.getElementById("cuadricula");
const filasDeCuadricula = Array.from(cuadricula.children);

let palabraAleatoria = PALABRAS[generarNumeroAleatorio(0,PALABRAS.length - 1)];

let ultimoInputActivo = null;

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

function desactivarFilas(inputs,fila){
    if (fila !== cuadricula.children[0]) {
            
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
        desactivarFilas(inputs, fila);
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

                if(indiceActual > -1 && cuadrados.length -1){
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

function manejarTecladoVirtual() {
    const teclado = document.querySelector("#teclado");
    const botonEnter = document.getElementById("boton-enter");
    const botonDelete = document.getElementById("boton-delete");

    teclado.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            event.preventDefault();
            const letra = event.target.innerText; 

            if (ultimoInputActivo) {
                ultimoInputActivo.value = letra;

                const cuadrados = Array.from(document.querySelectorAll(".cuadrado"));
                const indiceActual = cuadrados.indexOf(ultimoInputActivo);

                if (indiceActual > -1 && indiceActual < cuadrados.length - 1) {
                    cuadrados[indiceActual + 1].focus();
                }
            }
        }
    });

    botonEnter.addEventListener("click", () => {
        const eventoTecladoEnter = new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            keycode: 13,
            bubbles: true
        });

        cuadricula.dispatchEvent(eventoTecladoEnter);
    })

    botonDelete.addEventListener("click", () => {
        const eventoTecladoDelete = new KeyboardEvent("keydown", {
            key: "Backspace",
            code: "Backspace",
            keycode: 8,
            bubbles: true
        });

        cuadricula.dispatchEvent(eventoTecladoDelete);
    })
}

manejarTecladoVirtual();

// document.addEventListener("keydown", (event) => {
//     console.log("Tecla presionada:", event.key); // La tecla presionada, e.g., "Enter"
//     console.log("Código de la tecla:", event.code); // Código físico de la tecla, e.g., "Space"

//     if (event.key === " ") {
//         console.log("Se presionó la barra espaciadora");
//     } else if (event.key === "Backspace") {
//         console.log("Se presionó la tecla Borrar");
//     } else if (event.key === "Enter") {
//         console.log("Se presionó la tecla Enter");
//     } else if (event.key === "Shift") {
//         console.log("Se presionó la tecla Mayúsculas");
//     }
// });

