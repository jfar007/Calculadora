

var numero1 =0
var numero2 =0
var acumulador = "";
var vez= 0;
var signo = ""
var Eventos = {
	
	  init: function(){
		     this.asignarEventos();
	  },
	  asignarEventos: function(){
		var teclas = document.querySelectorAll("[class^='tecla']");
		for (var i = 0; i < teclas.length; i++) {
		  teclas[i].onclick = this.eventoMostrarTecla;
		}
	  },
	  eventoMostrarTecla: function(event){
		mostrarTecla(event.target);
	  }

}

function mostrarTecla(elemento){
	var opera = true
	if(vez == 1){
		
		if(acumulador.startsWith("0") && elemento.id != "punto" && acumulador.indexOf(".",0) < 0 ){
			acumulador = ""
		}
		if(isNaN(Number(elemento.id)) && elemento.id != "punto"){
			operar(elemento)
			opera = false
		}
		
		if(elemento.id == "punto" && acumulador.indexOf(".",0) > 0){
			opera = false
		}

		if((acumulador.length) < 8 && opera){
			if(elemento.id == "punto"){
					acumulador  += "."
			}else{
					acumulador +=  elemento.id;
			}			
		}
		vez--
	}else{
		vez++
	}	
	actualizarTablero()
}

function operar(elemento){
	
	switch(elemento.id) {
		case "igual":
				console.log(elemento.id);
				operarIgual()
				break;
		case "mas":
				signo = elemento.id;
				numero1 += Number(acumulador)
				acumulador = ""
				numero2 = 0
				break;
		case "menos":
				signo = elemento.id;
				numero1 =  Number(acumulador) - numero1 
				acumulador = ""
				numero2 = 0
				break;
		case "por":
				signo = elemento.id;
				numero1 = Number(acumulador)
				acumulador = ""
				numero2 = 0
				break;
		case "dividido":
				signo = elemento.id;
				numero1 = Number(acumulador)
				acumulador = ""
				numero2 = 0
				break;
		case "sign":
				acumulador = acumulador * (-1)
				break;
		case "on":
				acumulador = "0"
				numero1 = 0
				numero2 = 0
				break;
		default:
				break;
	}

		
}

function actualizarTablero(){
		acumulador = acumulador + ""
		var pantalla = document.getElementById("display")
		pantalla.innerText = acumulador

}

function operarIgual(){
	acumulador = Number(acumulador)
	switch(signo) {
		case "mas":	
			if(numero2 != 0){
				acumulador += numero2
			}else{
				numero2 = acumulador
				acumulador += numero1
				numero1=0
			}		
			break;
		case "menos":
			if(numero2 != 0){
				acumulador -= numero2
			}else{
				numero2 = acumulador
				acumulador = numero1 - numero2
				numero1=0
			}		
			break;
		case "por":
			if(numero2 != 0){
				acumulador = acumulador * numero2
			}else{
				numero2 = acumulador
				acumulador = numero1 * acumulador 
				numero1=0
			}		
			break;
		case "dividido":
			if(numero2 != 0){
				acumulador = acumulador / numero2
			}else{
				numero2 = acumulador
				acumulador = numero1 / acumulador 
				numero1=0
			}		
			break;
		default:
			console.log("default");
			break;
	}	
}
Eventos.init();
