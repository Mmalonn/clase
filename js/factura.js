let source = `
{{#each items}}
	<tr>
		<td>{{idProducto}}</td><td>{{nombre}}</td><td>{{precio}}</td><td>{{cantidad}}</td><td>{{subtotal}}</td><td><a onclick="manager.borrarProducto(this)" href="#" class="btn btn-danger" data-id-producto="{{idProducto}}">Borrar</a></td>
	</tr>
{{/each}}`;		
let template = Handlebars.compile(source);
let productos = { items: [] }
for (let i=0, len=localStorage.length; i<len; i++) {
	let key = localStorage.key(i);
	let value = localStorage[key];
	productos.items.push(JSON.parse(value));
};
let htmlGenerado = template(productos);
document.getElementById('tbody-productos').innerHTML = htmlGenerado;

class Productos {
	constructor(idProducto, nombre, precio, cantidad, subtotal) {
		this.idProducto = idProducto;
		this.nombre = nombre;
		this.precio = precio;
		this.cantidad = cantidad;
		this.subtotal = subtotal;
	};
};

class Manager{
borrarProducto(boton) {
	bootbox.confirm("Borramos el producto?", function(result) {
		if (result == true) {
			let idProducto = boton.dataset.idProducto;
			let productoRecuperado = productos.items.find(p => p.idProducto == idProducto);
			let indexProductoParaBorrar = productos.items.indexOf(productoRecuperado);
			productos.items.splice(indexProductoParaBorrar, 1);
			//boton.parentNode.parentNode.remove();
			document.getElementById('tbody-productos').innerHTML = template(productos);			
			let idRecuperado= productoRecuperado.idProducto;
			localStorage.removeItem(idRecuperado);		
			let mensaje = document.getElementById("mensaje");
			mensaje.innerHTML = `<p class="col alert alert-danger text-center">Datos eliminados..</p>`
			setTimeout(function() {
					mensaje.firstChild.remove();
			}, 3000);
		}
		sumaTotales();
		sumaCantidades();
	});
}

agregarProductos() {
	let campoIdProducto = document.getElementById("campoIdProducto")
	let campoNombre = document.getElementById("campoNombre")
	let campoPrecio = document.getElementById("campoPrecio")
	let campoCantidad = document.getElementById("campoCantidad")	
	campoIdProducto.value
	for (let n = 0; n < productos.items.length; n++) {
		if(campoIdProducto.value ==productos.items[n].idProducto){
			let mensaje = document.getElementById("mensaje");
			mensaje.innerHTML = `<p class="col alert alert-danger text-center">El id del producto ya existe..</p>`;
			setTimeout(function() {
				mensaje.firstChild.remove();
			}, 3000);
			return;			
		};
	};
	if (campoIdProducto.value == "" || campoNombre.value == "" || campoPrecio.value == "" || campoCantidad.value == "") {
		let mensaje = document.getElementById("mensaje");
		mensaje.innerHTML = `<p class="col alert alert-danger text-center">Por favor ingrese valores en todos los campos..</p>`
		setTimeout(function() {
			mensaje.firstChild.remove();
		}, 3000);
		return;
	}
	if(isNaN(campoIdProducto.value) || isNaN(campoPrecio.value) || isNaN(campoCantidad.value)){
		let mensaje = document.getElementById("mensaje");
		mensaje.innerHTML = `<p class="col alert alert-danger text-center">Id, Cantidad y Precio solo admiten números..</p>`
		setTimeout(function() {
		mensaje.firstChild.remove();
	}, 3000);
		return;
	}
	let mensaje = document.getElementById("mensaje");
	mensaje.innerHTML = `<p class="col alert alert-success text-center">Datos ingresados correctamente..</p>`
	setTimeout(function() {
		mensaje.firstChild.remove();
	}, 3000);	
	let p = new Productos(campoIdProducto.value, campoNombre.value, campoPrecio.value, parseInt(campoCantidad.value), 0.0) ;
	p.subtotal = p.precio * p.cantidad;
	
	
	productos.items.push(p);
	document.getElementById("tbody-productos").innerHTML = template(productos);
	sumaTotales();
	sumaCantidades();
	document.getElementById("campoIdProducto").value = "";
	document.getElementById("campoNombre").value = "";
	document.getElementById("campoPrecio").value = "";
	document.getElementById("campoCantidad").value = "";
	localStorage.setItem(p.idProducto,JSON.stringify(p));

};
}

const sumaTotales = () => {
	let elementoPrecio = productos.items;
	let arrayPrecio = []
	for (let n = 0; n < elementoPrecio.length; n++) {
		arrayPrecio.push(productos.items[n].subtotal);
	};
	let sum = 0;
	for (let i = 0; i < arrayPrecio.length; i++) {
		sum += arrayPrecio[i];
	}
	document.getElementById("total").innerHTML = `$Total ${sum}`;
}

const sumaCantidades = () => {
	let elementoCantidades = productos.items;
	let arrayCantidades = []
	for (let n = 0; n < elementoCantidades.length; n++) {
		arrayCantidades.push(productos.items[n].cantidad);
	};
	let sum = 0;
	for (let i = 0; i < arrayCantidades.length; i++) {
		sum += arrayCantidades[i];
	}
	document.getElementById("cantidadTotal").innerHTML = `C.Total ${sum}`;
}
const manager = new Manager();
sumaTotales();
sumaCantidades();
