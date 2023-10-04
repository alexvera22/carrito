var usuarioLogin = "Juan Perez";
document.getElementById("nombreUsuario").innerHTML = usuarioLogin;

class Articulo {
    constructor(imagen, producto, precio) {
        this.id = ultimoId;
        this.imagen = imagen;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = 0;
        this.total = 0;
        this.cargado = false;
        ultimoId++;
    }
}

var ultimoId = 1;
var articulosDisponibles = [];

const Articulo1 = new Articulo("img/auto.jpg", "Auto", 15000);
const Articulo2 = new Articulo("img/maquinaPelo.jpg", "Maquina de cortar pelo", 25);
const Articulo3 = new Articulo("img/jabonDove.jpg", "Dove", 5);

articulosDisponibles.push(Articulo1);
articulosDisponibles.push(Articulo2);
articulosDisponibles.push(Articulo3);

const selectProductos = document.getElementById("slcProductos");

for (const producto of articulosDisponibles) {
    const nuevaOpcion = document.createElement("option");
    nuevaOpcion.value = producto.id;
    nuevaOpcion.textContent = producto.producto;
    selectProductos.appendChild(nuevaOpcion);
}

const tablaProductosBody = document.getElementById("tablaProductosBody");
const totalGeneralElement = document.getElementById("totalGeneral");
let totalGeneral = 0;

selectProductos.addEventListener("change", () => {
    const selectedProductId = parseInt(selectProductos.value);
    if (selectedProductId !== 0) {
        const selectedProduct = articulosDisponibles.find(producto => producto.id === selectedProductId);
        if (selectedProduct) {
            if (!selectedProduct.cargado) {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td><button class="btn btn-danger" id="eliminar_${selectedProduct.id}"><i class="fa fa-trash"></i></button></td>
                    <td class="w-25"><img src="${selectedProduct.imagen}" alt="${selectedProduct.producto}" class="img-thumbnail w-50"></td>
                    <td>${selectedProduct.producto}</td>
                    <td>${selectedProduct.precio}$</td>
                    <td><input type="number" min="1" value="1" id="cantidad_${selectedProduct.id}" class="form-control"></td>
                    <td id="total_${selectedProduct.id}">${selectedProduct.precio}$</td>
                `;
                tablaProductosBody.appendChild(newRow);
                selectedProduct.cargado = true;
                const cantidadInput = document.getElementById(`cantidad_${selectedProduct.id}`);
                cantidadInput.addEventListener("change", () => {
                    const cantidad = parseInt(cantidadInput.value);
                    selectedProduct.cantidad = cantidad;
                    const total = cantidad * selectedProduct.precio;
                    document.getElementById(`total_${selectedProduct.id}`).textContent = `${total}$`;
                    calcularTotalGeneral();
                });
                const eliminarButton = document.getElementById(`eliminar_${selectedProduct.id}`);
                eliminarButton.addEventListener("click", () => {
                    cantidadInput.value = 1;
                    document.getElementById(`total_${selectedProduct.id}`).textContent = `${selectedProduct.precio}$`;
                    selectedProduct.cargado = false;
                    newRow.remove();
                    calcularTotalGeneral();
                });
                calcularTotalGeneral();
            } else {
                mostrarMensaje("Este producto ya ha sido agregado.");
            }
            selectProductos.value = 0;
        }
    }
});

function calcularTotalGeneral() {
    totalGeneral = 0;
    for (const producto of articulosDisponibles) {
        if (producto.cargado) {
            const cantidadInput = document.getElementById(`cantidad_${producto.id}`);
            const cantidad = parseInt(cantidadInput.value);
            producto.cantidad = cantidad;
            const total = cantidad * producto.precio;
            document.getElementById(`total_${producto.id}`).textContent = `${total}$`;
            totalGeneral += total;
        }
    }
    totalGeneralElement.textContent = `${totalGeneral}$`;
}

btnPagar.addEventListener("click", () => {
    const productosEnCarrito = articulosDisponibles.filter(producto => producto.cargado);
    const aceptaTerminos = document.getElementById("flexCheckDefault").checked;

    if (productosEnCarrito.length === 0) {
        mostrarMensaje("El carrito está vacío. Agregue productos antes de pagar.");
    } else if (!aceptaTerminos) {
        mostrarMensaje("Debe aceptar nuestros términos y condiciones antes de pagar.");
    } else {
        mostrarMensaje("Procesando pago...");
    }
});

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById("mensajeDiv");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.classList.remove("d-none");
    setTimeout(() => {
        mensajeDiv.classList.add("d-none");
        mensajeDiv.textContent = "";
    }, 2000);
}