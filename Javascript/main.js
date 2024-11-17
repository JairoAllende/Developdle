const PALABRAS = ["HTML", "CSS", "Javascript"];
const cuadricula = document.getElementById("cuadricula");
let palabraAleatoria = PALABRAS[generarNumeroAleatorio(0,PALABRAS.length - 1)];

function generarNumeroAleatorio (min , max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function crearCuadrados(fila){
    
    for (let i = 0; i < palabraAleatoria.length; i++) {
        let cuadrado = document.createElement("input"); 
        cuadrado.classList.add("cuadrado");
        fila.appendChild(cuadrado);
    }
}

Array.from(cuadricula.children).forEach((fila) => {
    crearCuadrados(fila);
})



