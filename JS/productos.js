const productosContainer = document.querySelector("#productos-container");

const carritoContainer = document.querySelector("#carrito-container");

const carritoTotal = document.querySelector("#carrito-total");

const carritoContador = document.querySelector("#carrito-contador");

const finalizarCompra = document.querySelector("#finalizar-compra");

const checkout = document.querySelector("#checkout");

const checkoutForm = document.querySelector("#checkout-form");

const checkoutMensaje = document.querySelector("#checkout-mensaje");

const resumenPedido = document.querySelector("#resumen-pedido");

const resumenProductos = document.querySelector("#resumen-productos");

const resumenTotalPrecio = document.querySelector("#resumen-total-precio");

const volverCheckout = document.querySelector("#volver-checkout");

const confirmarCompra = document.querySelector("#confirmar-compra");

const compraExitosa = document.querySelector("#compra-exitosa");

const numeroPedido = document.querySelector("#numero-pedido");

const volverTienda = document.querySelector("#volver-tienda");

const filtroCategoria =
    document.querySelector("#filtro-categoria");

const ordenPrecio =
    document.querySelector("#orden-precio");



let productos = [];

let carrito = [];

function mostrarProductos(productos) {

    productosContainer.innerHTML = "";

    productos.forEach(producto => {

        const card = document.createElement("article");

        card.classList.add("producto-card");

        card.innerHTML = `
            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}"
            >

            <div class="producto-info">

                <span class="producto-categoria">
                    ${producto.categoria}
                </span>

                <h2>
                    ${producto.nombre}
                </h2>

                <p>
                    ${producto.descripcion}
                </p>

                <span class="producto-precio">
                    $${producto.precio}
                </span>

                <button 
                    class="producto-btn"
                    data-id="${producto.id}"
                >
                    Agregar al carrito
                </button>

            </div>
        `;
        
        productosContainer.appendChild(card);

    });
}

function aplicarFiltros() {

    let productosFiltrados = [...productos];


    // FILTER

    const categoria =
        filtroCategoria.value;


    if (categoria !== "todas") {

        productosFiltrados =
            productosFiltrados.filter(producto =>
                producto.categoria.toLowerCase() ===
                categoria.toLowerCase()
            );

    }


    // SORT

    if (ordenPrecio.value === "menor") {

        productosFiltrados.sort(
            (a, b) => a.precio - b.precio
        );

    }


    if (ordenPrecio.value === "mayor") {

        productosFiltrados.sort(
            (a, b) => b.precio - a.precio
        );

    }


    mostrarProductos(productosFiltrados);

}

filtroCategoria.addEventListener(
    "change",
    aplicarFiltros
);


ordenPrecio.addEventListener(
    "change",
    aplicarFiltros
);

function agregarAlCarrito(id) {

    const productoSeleccionado = productos.find(producto => producto.id === id);

    const productoEnCarrito = carrito.find(producto => producto.id === id);


    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

    } else {

        carrito.push({
            ...productoSeleccionado,
            cantidad: 1
        });

    }

    guardarCarrito();
    mostrarCarrito();

}

fetch("../data/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;

        mostrarProductos(productos);

        cargarCarrito();

    });


productosContainer.addEventListener("click", (event) => {

    if (event.target.classList.contains("producto-btn")) {

        const id = Number(event.target.dataset.id);

        agregarAlCarrito(id);

    }

});

carritoContainer.addEventListener("click", (event) => {


    if (event.target.classList.contains("cantidad-btn")) {

        const id = Number(event.target.dataset.id);

        const accion = event.target.dataset.accion;

        const producto = carrito.find(producto => producto.id === id);


        if (accion === "sumar") {

            producto.cantidad++;

        }


        if (accion === "restar") {

            producto.cantidad--;

        }


        if (producto.cantidad <= 0) {

            eliminarDelCarrito(id);

        }

        guardarCarrito();

        mostrarCarrito();

    }


    if (event.target.classList.contains("eliminar-btn")) {

        const id = Number(event.target.dataset.id);

        eliminarDelCarrito(id);

        guardarCarrito();

        mostrarCarrito();

    }

});

function mostrarCarrito() {

    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {

        carritoContainer.innerHTML = `

            <div class="carrito-vacio">

                <div class="carrito-vacio-icono">
                    🛒
                </div>

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agregá productos para comenzar a comprar.
                </p>

            </div>

        `;

        actualizarTotal();

        actualizarContadorCarrito();

        return;
    }


    carrito.forEach(producto => {

        const item = document.createElement("div");

        item.classList.add("carrito-item");

        item.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <div class="carrito-item-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    $${producto.precio}
                </p>

                <div class="carrito-cantidad">

                    <button 
                        class="cantidad-btn"
                        data-id="${producto.id}"
                        data-accion="restar">
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button 
                        class="cantidad-btn"
                        data-id="${producto.id}"
                        data-accion="sumar">
                        +
                    </button>

                </div>

                <button 
                    class="eliminar-btn"
                    data-id="${producto.id}">

                    Eliminar

                </button>

            </div>

        `;

        carritoContainer.appendChild(item);

    });

    actualizarTotal();

    actualizarContadorCarrito();

}

function actualizarTotal() {

    let total = 0;

    carrito.forEach(producto => {

        total += producto.precio * producto.cantidad;

    });

    carritoTotal.textContent = `$${total}`;

}

function eliminarDelCarrito(id) {

    carrito = carrito.filter(producto => producto.id !== id);

}

function actualizarContadorCarrito() {

    const cantidadTotal = carrito.reduce((total, producto) => {

        return total + producto.cantidad;

    }, 0);

    carritoContador.textContent = cantidadTotal;

}

function guardarCarrito() {

    localStorage.setItem("carritoBladeHouse", JSON.stringify(carrito));

}

function cargarCarrito() {

    const carritoGuardado = localStorage.getItem("carritoBladeHouse");

    if (carritoGuardado) {

        carrito = JSON.parse(carritoGuardado);

    }

    mostrarCarrito();

}


if (finalizarCompra) {

    finalizarCompra.addEventListener("click", () => {

        if (carrito.length === 0) {
            return;
        }

        mostrarCheckout();

    });

}


function mostrarCheckout() {

    checkout.style.display = "block";

    checkout.scrollIntoView({
        behavior: "smooth"
    });

}


if (checkoutForm) {

    checkoutForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();

        const apellido = document.querySelector("#apellido").value.trim();

        const email = document.querySelector("#email").value.trim();

        const telefono = document.querySelector("#telefono").value.trim();


        if (!nombre || !apellido || !email || !telefono) {

            checkoutMensaje.textContent =
                "Completá todos los campos para continuar.";

            return;

        }


        mostrarResumenPedido();

    });
}

function mostrarResumenPedido() {

    checkoutForm.style.display = "none";

    resumenPedido.style.display = "block";

    resumenProductos.innerHTML = "";

    let total = 0;


    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;


        const item = document.createElement("div");

        item.classList.add("resumen-item");


        item.innerHTML = `

            <div class="resumen-item-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>

                <p>
                    $${producto.precio} × ${producto.cantidad}
                </p>

            </div>


            <span class="resumen-item-precio">

                $${subtotal}

            </span>

        `;


        resumenProductos.appendChild(item);

    });


    resumenTotalPrecio.textContent = `$${total}`;

}

volverCheckout.addEventListener("click", () => {

    resumenPedido.style.display = "none";

    checkoutForm.style.display = "block";

});

function generarNumeroPedido() {

    const numero = Math.floor(100000 + Math.random() * 900000);

    return `BH-${numero}`;

}

if (confirmarCompra) {

    confirmarCompra.addEventListener("click", () => {

        const pedido = crearPedido();

        guardarPedido(pedido);

        numeroPedido.textContent = pedido.numero;

        carrito = [];

        guardarCarrito();

        mostrarCarrito();

        resumenPedido.style.display = "none";

        compraExitosa.style.display = "block";

        compraExitosa.scrollIntoView({
            behavior: "smooth"
        });

    });

}

volverTienda.addEventListener("click", () => {

    compraExitosa.style.display = "none";

    document.querySelector(".productos").scrollIntoView({
        behavior: "smooth"
    });

});

function obtenerDatosCliente() {

    return {

        nombre: document.querySelector("#nombre").value.trim(),

        apellido: document.querySelector("#apellido").value.trim(),

        email: document.querySelector("#email").value.trim(),

        telefono: document.querySelector("#telefono").value.trim()

    };

}

function calcularTotalCarrito() {

    return carrito.reduce((total, producto) => {

        return total + producto.precio * producto.cantidad;

    }, 0);

}

function crearPedido() {

    const pedido = {

        numero: generarNumeroPedido(),

        cliente: obtenerDatosCliente(),

        productos: [...carrito],

        total: calcularTotalCarrito(),

        fecha: new Date().toLocaleString()

    };

    return pedido;

}

function guardarPedido(pedido) {

    const pedidosGuardados =
        JSON.parse(localStorage.getItem("pedidosBladeHouse")) || [];

    pedidosGuardados.push(pedido);

    localStorage.setItem(
        "pedidosBladeHouse",
        JSON.stringify(pedidosGuardados)
    );

}









