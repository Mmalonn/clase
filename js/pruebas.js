//template************************************************************************************************************************************

let source=`
							<h1>Productos</h1>
							<tr class="row mb-5" >
								<td class="col">Codigo</td>
								<td class="col">Nombre</td>
								<td class="col">Precio</td>
							</tr>
							{{#each items}}
							<tr class="row">
								<td class="col">{{idProducto}}</td>
								<td class="col">{{nombre}}</td>
								<td class="col">{{precio}}</td>
								<td name="borrar" type="button" class="col-1 btn btn-danger m-1 align-center" >X</td>
							</tr>
							{{/each}}`;
							
let template = Handlebars.compile(source);

let formu = `
	<form>
		<div class="form-group">
			<label for="input1">Codigo</label> 
			<input type="number" class="form-control" id="input1" placeholder="ingresa codigo">
			<label for="input2">Nombre</label> 
			<input type="text" class="form-control" id="input2" placeholder="ingresa nombre">
			<label for="input3">Precio</label> 
			<input type="number" class="form-control" id="input3" placeholder="ingresa precio">
			<button type="submit" class="btn btn-primary mt-3" id="guardar">Guardar</button>
		</div>
	</form>
`;
let template2 = Handlebars.compile(formu);

let insertar = () => {

	let htmlGenerado = template2();
	document.getElementById('formulario').innerHTML = htmlGenerado;
};
insertar();


//crear clase*********************************************************************************************************************************

class Productos {
	constructor(idProducto, nombre, precio) {
		this.idProducto = idProducto;
		this.nombre = nombre;
		this.precio = precio;
	}
}



//funcion para agregar datos a la local storage***********************************************************************************************
document.getElementById("guardar").addEventListener("click", (e) => {
	if( document.getElementById("input1").value=="" || document.getElementById("input2").value=="" || document.getElementById("input3").value==""){
		console.log("por favor no dejes campos vacios");
		e.preventDefault();
	}else{
		let codi = document.getElementById("input1").value;
		let nom = document.getElementById("input2").value;
		let pre = document.getElementById("input3").value;
		let t = new Productos(codi, nom, pre);
		let datoString = JSON.stringify(t);
		let numeroAlto = localStorage.length;
		localStorage.setItem(numeroAlto, datoString);		
	}
	
})




//funcion para obtener los datos de la local storage******************************************************************************************
const funcion = () => {
	let caja = [];
	for (let n = 0; n < localStorage.length; n++) {
		caja.push(JSON.parse(localStorage.getItem(n)));
	};

	let productos = {
		items: caja
	};
	console.log(productos);
	let htmlGenerado = template(productos);
	document.getElementById('tabla-productos').innerHTML = htmlGenerado;
}
funcion();


//funcion para borrar dato

var elems = document.getElementsByName("borrar");

for (var i=0; i < elems.length; i++) {
	elems[i].addEventListener("click",(e)=>{	
		let identificador = e.target.parentElement.firstElementChild.textContent;
		e.target.parentElement.remove();
		console.log("hol");
		console.log(identificador);
		
		for (let n = 0; n < localStorage.length; n++) {
			let caracteristica = JSON.parse(localStorage.getItem(n));
			if(caracteristica.idProducto==identificador){
				localStorage.removeItem(n);
				console.log("removido");			
			};
		};
	});
};

/*
	let identificador = e.target.parentElement.firstElementChild.textContent;
	e.target.parentElement.remove();
	
	let caja = [];
	for (let n = 0; n < localStorage.length; n++) {
		caja.push(JSON.parse(localStorage.getItem(n)));

	};
	
	
	
	for (let n = 0; n < caja.length; n++) {
		if(caja[n].idProducto==identificador){
			let item = localStorage.getItem(n);
			localStorage.removeItem(n);
			console.log(item);
			location.reload();
		};
	};	
	

	});*/
