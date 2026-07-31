const turnosContainer =
    document.querySelector("#turnos-container");


function obtenerReservas() {

    return JSON.parse(
        localStorage.getItem("reservas")
    ) || [];

}

function cancelarTurno(idReserva) {

    const reservas =
        obtenerReservas();


    const reservasActualizadas =
        reservas.filter(
            reserva => reserva.id !== idReserva
        );


    localStorage.setItem(
        "reservas",
        JSON.stringify(reservasActualizadas)
    );


    mostrarTurnos();

}


function mostrarTurnos() {

    const reservas =
        obtenerReservas();


    turnosContainer.innerHTML = "";


    if (reservas.length === 0) {

        turnosContainer.innerHTML = `

            <div class="sin-turnos">

                <h2>No tenés turnos reservados</h2>

                <p>
                    Cuando reserves un turno,
                    aparecerá acá.
                </p>

                <a
                    href="turnos.html"
                    class="btn-turno btn-principal">

                    Reservar turno

                </a>

            </div>

        `;

        return;

    }


    reservas.forEach(reserva => {

        const fecha =
            new Date(reserva.fecha);


        const fechaFormateada =
            fecha.toLocaleDateString(
                "es-AR",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        const card =
            document.createElement("article");

        card.classList.add(
            "turno-reserva-card"
        );


        card.innerHTML = `

            <div class="turno-card-header">

                <div>

                    <span>
                        TURNO RESERVADO
                    </span>

                    <h2>
                        ${reserva.servicio.nombre}
                    </h2>

                </div>


                <strong>
                    ${reserva.id}
                </strong>

            </div>


            <div class="turno-card-info">

                <div>

                    <span>Barbero</span>

                    <strong>
                        ${reserva.barbero.nombre}
                    </strong>

                </div>


                <div>

                    <span>Fecha</span>

                    <strong>
                        ${fechaFormateada}
                    </strong>

                </div>


                <div>

                    <span>Horario</span>

                    <strong>
                        ${reserva.horario}
                    </strong>

                </div>


                <div>

                    <span>Precio</span>

                    <strong>
                        $${reserva.servicio.precio}
                    </strong>

                </div>

            </div>


            <div class="turno-card-footer">

                <button
                    type="button"
                    class="btn-cancelar"
                    data-id="${reserva.id}">

                    Cancelar turno

                </button>

            </div>

        `;


        turnosContainer.appendChild(card);

    });

}


mostrarTurnos();

turnosContainer.addEventListener(
    "click",
    (event) => {

        const boton =
            event.target.closest(".btn-cancelar");


        if (!boton) {
            return;
        }


        const idReserva =
            boton.dataset.id;


        Swal.fire({

            title: "¿Cancelar turno?",

            text: "Esta acción no se puede deshacer.",

            icon: "warning",

            customClass: {

                popup: "sweet-popup"

            },

            showCancelButton: true,

            confirmButtonText:
                "Sí, cancelar",

            cancelButtonText:
                "Volver",

            confirmButtonColor:
                "#D4AF37",

            cancelButtonColor:
                "#555"

        }).then((resultado) => {


            if (resultado.isConfirmed) {

                cancelarTurno(idReserva);


                Swal.fire({

                    title:
                        "Turno cancelado",

                    text:
                        "La reserva fue eliminada correctamente.",

                    icon:
                        "success",

                    confirmButtonText:
                        "Aceptar",

                    confirmButtonColor:
                        "#D4AF37"

                });

            }

        });

    }
);

