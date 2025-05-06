const PALABRAS = ["HTML"];
const CUADRICULA = document.getElementById("cuadricula");
const FILASDECUADRICULA = Array.from(CUADRICULA.children);
let palabraAleatoria = "";
let ultimoInputActivo = null;
let botonContinuar = null;
let cartel = document.createElement("div");
let puntosSumados = 0;
let puntosTotales = 0;

function generarNumeroAleatorio (min , max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function iniciarJuego(){
    console.log(PALABRAS);
    palabraAleatoria = PALABRAS[generarNumeroAleatorio(0,PALABRAS.length - 1)];
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
            
            let indiceDePalabra = PALABRAS.indexOf(palabraAleatoria);
            if(indiceDePalabra !== -1){
                PALABRAS.splice(indiceDePalabra,1);
            }

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
                mostrarCartel("gano");
                contador = 0;
                return true;
            }
    
        return false;
    }

    function verificarLetras(filaActual, palabraActual) {
        console.log("Verificando contra:", palabraActual.join(""));

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
            mostrarCartel("perdio");
        }else if(PALABRAS.length === 0){
            crearCartel("completo");
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
    
    function crearCartel(resultado){
        cartel.innerHTML = "";
        cartel.classList.add("cartel");
    
        const contenedorMensaje = document.createElement("div");
        const mensaje = document.createElement("h3");
        contenedorMensaje.appendChild(mensaje);
        switch(resultado){
        case "gano":
            mensaje.textContent = "Capo!";
            break;
        case "perdio":
            mensaje.textContent = "Volvelo a intentar";
            break;
        case "completo":
            mensaje.textContent = "Felicitaciones, ganaste!";
            break;
        }
        cartel.appendChild(contenedorMensaje);
        
        let emote;
        switch(resultado){
        case "gano":
            emote = document.createTextNode("😎");
            break;
        case "perdio":
            emote = document.createTextNode("😅");
            break;
        case "completo":
            emote = document.createTextNode("💯");
            break;
        }
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
        switch(resultado){
        case "gano":
            botonContinuar.textContent = "Continuar";
            break;
        case "perdio":
            botonContinuar.textContent = "Reintentar palabra";
            break;
        case "completo":
            botonContinuar.textContent = "Reiniciar juego";
            juegoTerminado();
            break;
        }
        cartel.appendChild(botonContinuar);
        
        document.body.appendChild(cartel);

        botonContinuar.addEventListener("click", (e)=>{
            document.getElementById("titulo").classList.remove("mostrarH1");

            if(e.target){
                CUADRICULA.style.display = "flex";
                cartel.remove();
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

            if(botonContinuar.innerHTML === "Reiniciar juego"){
                PALABRAS.push("HTML", "CSS", "JAVASCRIPT", "JAVA", "REACT");
                puntosSumados = 0;
                puntosTotales = 0;
            }

            iniciarJuego();
        })
    }

    function juegoTerminado (){
        let botonTerminarJuego = document.createElement("button");
        botonTerminarJuego.innerHTML = "Terminar Juego";
        botonTerminarJuego.classList.add("boton-cartel");
        cartel.appendChild(botonTerminarJuego);
        botonTerminarJuego.addEventListener("click", e => {
            if(e.target){
                cartel.remove();
                let cartelTerminarJuego = document.createElement("div");
                cartelTerminarJuego.classList.add("cartel");
                let felicitaciones = document.createElement("h2");
                felicitaciones.innerHTML = "Felicitaciones!<br><br>Descubriste todas las palabras!";
                let divRedes = document.createElement("div");
                divRedes.classList.add("contenedor-logo-redes");
        
                let divInstagram = document.createElement("div");        
                let enlaceInstagram = document.createElement("a");
                enlaceInstagram.href = "https://www.instagram.com/jaiiiroa/";
                enlaceInstagram.target = "_blank";

                let logoInstagram = document.createElement("img");
                logoInstagram.classList.add("logo-redes");
                logoInstagram.src = "./Estilos/assets/logoInstagram.png";
                logoInstagram.alt = "Instagram";
                logoInstagram.style.position = "relative";
                logoInstagram.style.left = "40px";


                let divGithub = document.createElement("div");
                let enlaceGithub = document.createElement("a");
                enlaceGithub.href = "https://github.com/JairoAllende?tab=repositories&q=&type=public&language=&sort=";
                enlaceGithub.target = "_blank";

                let logoGithub = document.createElement("img");
                logoGithub.classList.add("logo-redes")
                logoGithub.src = "./Estilos/assets/logoGitHub.png";
                logoGithub.alt = "GitHub";

                let divLinkedIn = document.createElement("div");  
                let enlaceLinkedIn = document.createElement("a");
                enlaceLinkedIn.href = "https://www.linkedin.com/in/jairo-allende-565542208/";
                enlaceLinkedIn.target = "_blank";

                let logoLinkedIn = document.createElement("img");
                logoLinkedIn.classList.add("logo-redes")
                logoLinkedIn.src = "./Estilos/assets/logoLinkedIn.png";
                logoLinkedIn.alt = "LinkedIn";
                logoLinkedIn.style.position = "relative";
                logoLinkedIn.style.right = "40px";

                enlaceInstagram.appendChild(logoInstagram);
                enlaceGithub.appendChild(logoGithub);
                enlaceLinkedIn.appendChild(logoLinkedIn);
                
                divRedes.appendChild(divInstagram);
                divRedes.appendChild(divGithub);
                divRedes.appendChild(divLinkedIn);
                
                divInstagram.appendChild(enlaceInstagram);
                divGithub.appendChild(enlaceGithub);
                divLinkedIn.appendChild(enlaceLinkedIn);

                cartelTerminarJuego.appendChild(felicitaciones);
                cartelTerminarJuego.appendChild(divRedes);
                document.body.appendChild(cartelTerminarJuego);

                const TECLADO = document.querySelector("#teclado");
                TECLADO.remove();
            }
        })
    }
    
    function mostrarCartel(resultado){
        CUADRICULA.style.removeProperty("display");
        CUADRICULA.style.display = "none";
        crearCartel(resultado);
        document.getElementById("titulo").classList.add("mostrarH1");
    }
    
    manejarTecladoVirtual();
    botonConfirmar();
}

iniciarJuego();

//Arreglar el responsive
//Mejorar los carteles