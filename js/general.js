function recuperar() {
	let ejemploInput = document.getElementById('ejemploInput');
	let valorEjemploInput = ejemploInput.value;
	console.log(valorEjemploInput)
	let divContenido = document.getElementById('divContenido');
	divContenido.innerHTML = 'El valor del input es: <b>' + valorEjemploInput + '</b>';
}




function calcular() {
	let valor1 = parseInt(document.getElementById('valor1').value);
	let valor2 = parseInt(document.getElementById('valor2').value);
	let selectedValue = document.getElementById("seleccion").value;
	let casilla = document.getElementById('resultado');
	if (isNaN(valor1) || isNaN(valor2)) {
		casilla.innerHTML = 'Por favor ingrese numeros';

	} else {
		switch (selectedValue) {
			case "0":
				casilla.innerHTML = 'Por favor elija una operacion';
				break;
			case "1":
				casilla.innerHTML = `Su resultado es ${valor1 + valor2}`;
				break;
			case "2":
				casilla.innerHTML = `Su resultado es ${valor1 - valor2}`;
				break;
			case "3":
				casilla.innerHTML = `Su resultado es ${valor1 * valor2}`;
				break;
			case "4":
				casilla.innerHTML = `Su resultado es ${valor1 / valor2}`;
				break;
		}
	}
};

//***************************************************************************************************************/


function agregarUno() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 1;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 1;
	}
}
function agregarDos() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 2;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 2;
	}
}
function agregarTres() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 3;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 3;
	}
}
function agregarCuatro() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 4;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 4;
	}
}
function agregarCinco() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 5;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 5;
	}
}
function agregarSeis() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 6;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 6;
	}
}
function agregarSiete() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 7;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 7;
	}
}
function agregarOcho() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 8;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 8;
	}
}
function agregarNueve() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 9;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 9;
	}
}
function agregarCero() {
	let valor = document.getElementById('ingresarOperacion');
	if (valor.value == "") {
		document.getElementById("ingresarPrimerValor").value = document.getElementById("ingresarPrimerValor").value + 0;
	} else {
		document.getElementById("ingresarSegundoValor").value = document.getElementById("ingresarSegundoValor").value + 0;
	}
}





function sumatatron() {
	document.getElementById('ingresarOperacion').value = "sumar";
}
function restatatron() {
	document.getElementById('ingresarOperacion').value = "restar";
}
function multiplicatron() {
	document.getElementById('ingresarOperacion').value = "multiplicar";
}
function dividetron() {
	document.getElementById('ingresarOperacion').value = "dividir";
}



function igualatron() {
	let pri = parseInt(document.getElementById('ingresarPrimerValor').value);
	let sec = parseInt(document.getElementById('ingresarSegundoValor').value);
	let selectedValue = document.getElementById("ingresarOperacion").value;
	let casilla = document.getElementById('cajitaResultado');
	switch (selectedValue) {
		case "sumar":
			casilla.innerHTML = `Su resultado es ${pri + sec}`;
			break;
		case "restar":
			casilla.innerHTML = `Su resultado es ${pri - sec}`;
			break;
		case "multiplicar":
			casilla.innerHTML = `Su resultado es ${pri * sec}`;
			break;
		case "dividir":
			casilla.innerHTML = `Su resultado es ${pri / sec}`;
			break;
	}
}

function limpiar() {
	document.getElementById('ingresarPrimerValor').value = "";
	document.getElementById('ingresarSegundoValor').value = "";
	document.getElementById("ingresarOperacion").value = "";

	document.getElementById("cajitaResultado").innerHTML = "";
}

