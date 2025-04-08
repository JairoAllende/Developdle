const PALABRAS = ["HTML", "CSS", "JAVASCRIPT", "JAVA", "REACT"];
const CUADRICULA = document.getElementById("cuadricula");
const FILASDECUADRICULA = Array.from(CUADRICULA.children);
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

function iniciarJuego(){
    let palabraAleatoria = PALABRAS[generarNumeroAleatorio(0,PALABRAS.length - 1)];
    let contador = 0;

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
        if (fila !== FILASDECUADRICULA[0]) {
                
            inputs.forEach((input) => {
                input.setAttribute("readonly", "true");
                input.classList.add("cuadrado-desactivado");
            });
        }
    }

    function insertarCuadrados(){
        FILASDECUADRICULA.forEach((fila) => {
            while(fila.firstChild){
                fila.removeChild(fila.firstChild);
            }
            
            crearCuadrados(fila);

            const INPUTS = Array.from(fila.querySelectorAll("input"));
    
            desactivarFilasInicio(INPUTS, fila);
        });
    }

    function restringirCaracteres(){
        const CUADRADOS = document.querySelectorAll(".cuadrado");
        
        CUADRADOS.forEach((cuadrado) => {
            cuadrado.addEventListener("input", (e) => {
                const cuadradoActual = e.target;
                if(cuadradoActual.value.charCodeAt(0) < 65 || cuadradoActual.value.charCodeAt(0) > 90){
                    cuadradoActual.value = "";
                }
            })
         
        })
    }

    function cambiarDeCuadrado(){
        const CUADRADOS = document.querySelectorAll(".cuadrado");
    
        CUADRADOS.forEach((cuadrado) => {
            cuadrado.addEventListener("input", (cambiarCuadrado) => {
                const CUADRADOACTUAL = cambiarCuadrado.target;
                
                if(CUADRADOACTUAL.value !== ""){
                    const INDICEACTUAL = Array.from(CUADRADOS).indexOf(CUADRADOACTUAL);
    
                    if(INDICEACTUAL > -1 &&  INDICEACTUAL < CUADRADOS.length -1){
                        Array.from(CUADRADOS)[INDICEACTUAL + 1].focus();
                    }
    
                }
            })
            
        })
    }

    function retrosederCuadrados(){
        const CUADRADOS = document.querySelectorAll(".cuadrado");
    
        CUADRADOS.forEach((cuadrado) =>{
            cuadrado.addEventListener("keydown", (event) =>{
                if(event.key === "Backspace" && !cuadrado.value){
                    const INDICEACTUAL = Array.from(CUADRADOS).indexOf(cuadrado);
    
                    if(INDICEACTUAL > 0){
                        CUADRADOS[INDICEACTUAL - 1].focus();
                    }
                }
            })
        })
    }

    insertarCuadrados();
    restringirCaracteres();
    cambiarDeCuadrado();
    retrosederCuadrados();

    document.querySelectorAll(".cuadrado").forEach((cuadrado) => {
        cuadrado.addEventListener("focus", (event) => {
            ultimoInputActivo = event.target;
        });
    });
    
    function palabraEncontrada(filaActual, palabraActual) {
        let letrasCorrectas = 0;
    
        filaActual.forEach((letra, indice) => {
            if (letra.value === palabraActual[indice]) {
                letrasCorrectas++;
            }
        });
    
        if(letrasCorrectas === palabraActual.length) {
            FILASDECUADRICULA.forEach((input) => {
                input.setAttribute("readonly", "true");
                input.classList.add("cuadrado-desactivado");
            });
    
            switch (FILASDECUADRICULA[contador].id) {
                case "primera-fila":
                    puntosSumados = 60;
                    puntosTotales += puntosSumados;
                    break;
                case "segunda-fila":
                    puntosSumados = 50;
                    puntosTotales += puntosSumados;
                    break;
                case "tercera-fila":
                    puntosSumados = 40;
                    puntosTotales += puntosSumados;
                    break;
                case "cuarta-fila":
                    puntosSumados = 30;
                    puntosTotales += puntosSumados;
                    break;
                case "quinta-fila":
                    puntosSumados = 20;
                    puntosTotales += puntosSumados;
                    break;
                case "sexta-fila":
                    puntosSumados = 10;
                    puntosTotales += puntosSumados;
                    break;  
                default:
                    break;
                }
                mostrarCartel();
                contador = 0;
                return true;
            }
    
        return false;
    }

    function verificarLetras(filaActual, palabraActual) {
        const BOTONESTECLADO = document.querySelectorAll(".botones");
        
        filaActual.forEach((letra, indice) => {
            let color = '';

            if(letra.value === palabraActual[indice]){
                color = 'verde';
            }else if(palabraActual.includes(letra.value)){
                color = 'amarillo';
            }else{
                color = 'gris'
            }

            filaActual[indice].classList.add(`cuadrado-${color}`);

            BOTONESTECLADO.forEach((boton) => {
                if(boton.textContent === letra.value){
                    if(color === 'verde'){
                        boton.classList.remove("cuadrado-amarillo", "cuadrado-gris");
                        boton.classList.add("cuadrado-verde");
                    }else if(color === 'amarillo'&& !boton.classList.contains("cuadrado-verde")){
                        boton.classList.remove("cuadrado-gris");
                        boton.classList.add("cuadrado-amarillo");
                    }else if(color === 'gris' && !boton.classList.contains("cuadrado-verde") && !boton.classList.contains("cuadrado-amarillo")){
                        boton.classList.add("cuadrado-gris");
                    }
                }
            })
        })
    }

    function habilitarFilas(){
        let filaActual = Array.from(FILASDECUADRICULA[contador].children);
        let palabraActual = Array.from(palabraAleatoria);
        let palabraEsCorrecta = palabraEncontrada(filaActual, palabraActual);

        if(!palabraEsCorrecta && contador === 5){
            puntosSumados = 0;
            mostrarCartel(false)
        }
    
        if(filaActual.length === filaActual.filter((elem) => elem.value != "").length){
            filaActual.forEach((input) => {
                input.setAttribute("readonly", "true"); 
                input.classList.add("cuadrado-desactivado");
                verificarLetras(filaActual, palabraActual);
            })
        
            if(contador < FILASDECUADRICULA.length - 1 && !palabraEsCorrecta){
                let filaSiguiente = Array.from(FILASDECUADRICULA[contador + 1].children);
        
                filaSiguiente.forEach((input) => {
                    input.removeAttribute("readonly", "true");
                    input.classList.remove("cuadrado-desactivado");
                })
            }
            contador++;
        }

    }

    function manejarTecladoVirtual() {
        const TECLADO = document.querySelector("#teclado");
        const CUADRADOS = Array.from(document.querySelectorAll(".cuadrado"));
        
        TECLADO.addEventListener("click", (event) => {
            if(event.target.tagName === "BUTTON" && event.target.id !== "boton-delete" && event.target.id !== "boton-enter") {
                event.preventDefault();
                const LETRA = event.target.innerText;
                const INDICEACTUAL = CUADRADOS.indexOf(ultimoInputActivo);
    
                if (ultimoInputActivo && !ultimoInputActivo.hasAttribute("readonly")) {
                    ultimoInputActivo.value = LETRA;  
    
                    if (INDICEACTUAL > -1 && INDICEACTUAL < CUADRADOS.length - 1) {
                        CUADRADOS[INDICEACTUAL + 1].focus();
                    }
                }
            }else if(event.target.id === "boton-delete" && ultimoInputActivo.value === ""){   
                if(INDICEACTUAL > 0 && INDICEACTUAL < CUADRADOS.length -1){
                    CUADRADOS[INDICEACTUAL - 1].focus();
                    ultimoInputActivo.value = "";
                }else if(INDICEACTUAL === 0){
                    CUADRADOS[INDICEACTUAL].focus();
                }
            }else if(event.target.id === "boton-enter"){
                if(FILASDECUADRICULA[contador]){  
                    habilitarFilas();
                }
            }
        });
    }

    function botonConfirmar(){
        window.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                if(FILASDECUADRICULA[contador]){
                    habilitarFilas();
                }
            }
        })
    }
    
    function crearCartel(gano){
       cartel = document.createElement("div");
       cartel.classList.add("cartel");
    
       const contenedorMensaje = document.createElement("div");
       const mensaje = document.createElement("h3");
       contenedorMensaje.appendChild(mensaje);
       mensaje.textContent = gano? "Capo!" : "Volvelo a intentar";
       cartel.appendChild(contenedorMensaje);
    
       const emote = document.createTextNode(gano ? "😎" : "😅");
       contenedorMensaje.appendChild(emote);
    
       const contenedorPuntaje = document.createElement("div");
       const puntajeActual = document.createElement("h3");
       puntajeActual.textContent = `+ ${puntosSumados} puntos`;
       contenedorPuntaje.appendChild(puntajeActual);
       cartel.appendChild(contenedorPuntaje);
    
       const puntajeTotal = document.createElement("h3");
       puntajeTotal.textContent = `Puntaje total: ${puntosTotales}`;
       contenedorPuntaje.appendChild(puntajeTotal);
    
       botonContinuar = document.createElement("button");
       botonContinuar.classList.add("boton-cartel");
       botonContinuar.textContent = "Continuar";
       cartel.appendChild(botonContinuar);
    
       document.body.appendChild(cartel); 
    }
    
    function continuarJuego(){
        botonContinuar.addEventListener("click", (e)=>{
            if(e.target){
                CUADRICULA.style.display = "flex";
                cartel.style.removeProperty("display");
                cartel.style.display = "none";
            }
    
            document.querySelectorAll(".cuadrado").forEach((e) => {
                e.classList.remove("cuadrado-verde", "cuadrado-amarillo", "cuadrado-gris","cuadrado-desactivado");
                e.value = "";
                e.removeAttribute("readonly");
                e.classList.add("cuadrado");
            }) 

            document.querySelectorAll(".botones").forEach((e) =>{
                e.classList.remove("cuadrado-verde", "cuadrado-amarillo", "cuadrado-gris","cuadrado-desactivado");
            })

            iniciarJuego();
        })
    }
    
    function mostrarCartel(gano = true){
        CUADRICULA.style.removeProperty("display");
        CUADRICULA.style.display = "none";
        crearCartel(gano);
    
        continuarJuego();
    }
    
    manejarTecladoVirtual();
    botonConfirmar();
}

iniciarJuego();

//1- Eliminar las palabras que son descubiertas
//2- acomodar las vista para el responsive
//3- Probar errores