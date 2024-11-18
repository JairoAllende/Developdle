const PALABRAS = ["HTML", "CSS", "Javascript"];
const cuadricula = document.getElementById("cuadricula");
const filasDeCuadricula = Array.from(cuadricula.children);

let palabraAleatoria = PALABRAS[generarNumeroAleatorio(0,PALABRAS.length - 1)];

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

function manejarTeclado(){ //Event Delegation
    const teclado = document.querySelector("#teclado");

    console.log(teclado);
    teclado.addEventListener("click", (event) => {
        if(event.target.tagName === "BUTTON"){
            console.log(event.target.innerText);
            return event.target.innerText;
        }
    })
}

manejarTeclado();
console.log(manejarTeclado())

Array.from(document.getElementsByClassName("filas").children).forEach(cuadrado => {
    cuadrado.addEventListener
});