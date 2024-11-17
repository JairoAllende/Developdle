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

Array.from(cuadricula.children).forEach((fila) => {
    crearCuadrados(fila);

    const inputs = Array.from(fila.querySelectorAll("input"));

    if (fila !== cuadricula.children[0]) {
        
        inputs.forEach((input) => {
            input.setAttribute("readonly", "true");
            input.classList.add("cuadrado-desactivado");
        });
    }
});