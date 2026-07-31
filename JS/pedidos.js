const pedidosContainer =
    document.querySelector("#pedidos-container");


function cargarPedidos() {

    const pedidosGuardados =
        JSON.parse(
            localStorage.getItem("pedidosBladeHouse")
        ) || [];


    mostrarPedidos(pedidosGuardados);

}


cargarPedidos();

function mostrarPedidos(pedidos) {

    pedidosContainer.innerHTML = "";


    if (pedidos.length === 0) {

        pedidosContainer.innerHTML = `

            <div class="pedidos-vacios">

                <div class="pedidos-vacios-icono">
                    🛍️
                </div>

                <h2>
                    Todavía no realizaste ninguna compra
                </h2>

                <p>
                    Cuando realices una compra,
                    aparecerá aquí.
                </p>

                <a
                    href="productos.html"
                    class="btn-ir-productos">

                    Ver productos

                </a>

            </div>

        `;

        return;

    }


    pedidos.forEach(pedido => {

        crearPedido(pedido);

    });

}

function crearPedido(pedido) {

    const pedidoElement =
        document.createElement("article");


    pedidoElement.classList.add("pedido-card");


    pedidoElement.innerHTML = `

        <div class="pedido-header">

            <div>

                <span class="pedido-label">
                    Pedido
                </span>

                <h2>
                    ${pedido.numero}
                </h2>

            </div>


            <span class="pedido-fecha">
                ${pedido.fecha}
            </span>

        </div>


        <div class="pedido-productos">

            ${crearProductosPedido(pedido.productos)}

        </div>


        <div class="pedido-footer">

            <span>
                Total
            </span>

            <strong>
                $${pedido.total}
            </strong>

        </div>

    `;


    pedidosContainer.appendChild(pedidoElement);

}

function crearProductosPedido(productos) {

    return productos.map(producto => {

        const subtotal =
            producto.precio * producto.cantidad;


        return `

            <div class="pedido-producto">

                <div class="pedido-producto-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        ${producto.descripcion}
                    </p>

                </div>


                <div class="pedido-producto-cantidad">

                    ${producto.cantidad} ×

                </div>


                <strong>

                    $${subtotal}

                </strong>

            </div>

        `;

    }).join("");

}

