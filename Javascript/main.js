const PALABRAS = ["HTML", "CSS", "JAVASCRIPT"];
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
            console.log("Llamamos a la funcion verificar")
        }
    });
}

manejarTecladoVirtual();

function botonConfirmar(){
    window.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            console.log("Gola")
        }
    })
}

botonConfirmar();

// function verificarPalabra(palabraActual){
//     let letrasDePalabraActual = Array.from(palabraActual);
//     letrasDePalabraActual.forEach((letra) => {
//         console.log(letra);
//     })
    
//     const cuadrados = document.querySelectorAll(".cuadrado");
//     cuadrados.forEach((cuadrado) => {
//         cuadrado.addEventListener("input", () => {
//            console.log(cuadrado.value) 
//         })
//     })

//     for (let i = 0; i < letrasDePalabraActual.length; i++) {
//         let letraDeLaPalabra = letrasDePalabraActual[i]
//         let letraDeLaCuadricula = cuadrados[i];
        
//         if(letraDeLaPalabra != null){
//             console.log("la letra coincide")
//         }
//     }
// }

// verificarPalabra(palabraAleatoria);