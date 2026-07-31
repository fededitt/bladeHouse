const serviciosContainer =
    document.querySelector("#servicios-container");

const btnServicio =
    document.querySelector("#btn-servicio");

const pasosProgreso =
    document.querySelectorAll(".turnos-progreso .paso");

const lineasProgreso =
    document.querySelectorAll(".turnos-progreso .linea");

const barberosContainer = document.querySelector("#barberos-container");

const pasoServicio = document.querySelector("#paso-servicio");

const pasoBarbero = document.querySelector("#paso-barbero");

const continuarBarbero = document.querySelector("#continuar-barbero");

const volverServicio = document.querySelector("#volver-servicio");

const pasoDatos =
    document.querySelector("#paso-datos");

const formularioDatos =
    document.querySelector("#formulario-datos");

const volverHorario =
    document.querySelector("#volver-horario");

const pasoFecha =
    document.querySelector("#paso-fecha");

const continuarFecha =
    document.querySelector("#continuar-fecha");

const volverBarbero =
    document.querySelector("#volver-barbero");

const mesActual =
    document.querySelector("#mes-actual");

const calendarioDias =
    document.querySelector("#calendario-dias");

const mesAnterior =
    document.querySelector("#mes-anterior");

const mesSiguiente =
    document.querySelector("#mes-siguiente");

const pasoHorario =
    document.querySelector("#paso-horario");

const horariosContainer =
    document.querySelector("#horarios-container");

const continuarHorario =
    document.querySelector("#continuar-horario");

const volverFecha =
    document.querySelector("#volver-fecha");

const pasoConfirmacion =
    document.querySelector("#paso-confirmacion");

const volverDatos =
    document.querySelector("#volver-datos");

const confirmarReserva =
    document.querySelector("#confirmar-reserva");


const resumenServicio =
    document.querySelector("#resumen-servicio");

const resumenBarbero =
    document.querySelector("#resumen-barbero");

const resumenFecha =
    document.querySelector("#resumen-fecha");

const resumenHorario =
    document.querySelector("#resumen-horario");

const resumenNombre =
    document.querySelector("#resumen-nombre");

const resumenTelefono =
    document.querySelector("#resumen-telefono");

const resumenEmail =
    document.querySelector("#resumen-email");

const resumenComentario =
    document.querySelector("#resumen-comentario");

const resumenObservacionContainer =
    document.querySelector(
        "#resumen-observacion-container"
    );

const reservaConfirmada =
    document.querySelector("#reserva-confirmada");

const codigoReserva =
    document.querySelector("#codigo-reserva");

const finalServicio =
    document.querySelector("#final-servicio");

const finalBarbero =
    document.querySelector("#final-barbero");

const finalFecha =
    document.querySelector("#final-fecha");

const finalHorario =
    document.querySelector("#final-horario");

const nuevoTurno =
    document.querySelector("#nuevo-turno");




let servicios = [];

let barberos = [];

let servicioSeleccionado = null;

let barberoSeleccionado = null;

let fechaSeleccionada = null;

let horarioSeleccionado = null;

let fechaCalendario = new Date();

const diasTrabajo = [1, 2, 3, 4, 5, 6];

const horariosDisponibles = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00"
];

const horaCierre = "19:00";


function actualizarProgreso(pasoActual) {

    pasosProgreso.forEach((paso, index) => {

        paso.classList.remove("activo");
        paso.classList.remove("completado");


        if (index < pasoActual) {

            paso.classList.add("completado");

        }


        if (index === pasoActual) {

            paso.classList.add("activo");

        }

    });


    lineasProgreso.forEach((linea, index) => {

        linea.classList.remove("completada");


        if (index < pasoActual) {

            linea.classList.add("completada");

        }

    });

}

actualizarProgreso(0);

fetch("../data/turnos.json")
    .then(response => response.json())
    .then(data => {

        servicios = data.servicios;
        barberos = data.barberos;

        mostrarServicios();
        mostrarBarberos();

    });

function mostrarServicios() {

    serviciosContainer.innerHTML = "";

    servicios.forEach(servicio => {

        const card =
            document.createElement("article");

        card.classList.add("servicio-turno-card");

        card.innerHTML = `

            <div class="servicio-turno-info">

                <span>
                    ${servicio.duracion} min
                </span>

                <h3>
                    ${servicio.nombre}
                </h3>

                <p>
                    ${servicio.descripcion}
                </p>

                <strong>
                    $${servicio.precio}
                </strong>

            </div>

        `;

        card.dataset.id = servicio.id;

        serviciosContainer.appendChild(card);

    });

}

serviciosContainer.addEventListener("click", (event) => {

    const card =
        event.target.closest(".servicio-turno-card");


    if (!card) {
        return;
    }


    const id =
        Number(card.dataset.id);


    servicioSeleccionado =
        servicios.find(servicio => servicio.id === id);


    document
        .querySelectorAll(".servicio-turno-card")
        .forEach(card => {

            card.classList.remove("seleccionado");

        });


    card.classList.add("seleccionado");


    btnServicio.disabled = false;

});

function mostrarBarberos() {

    barberosContainer.innerHTML = "";

    barberos.forEach(barbero => {

        const card = document.createElement("article");

        card.classList.add("barbero-card");

        card.dataset.id = barbero.id;

        card.innerHTML = `

            <div class="barbero-icono">
                ${barbero.nombre.charAt(0)}
            </div>

            <div class="barbero-info">

                <h3>
                    ${barbero.nombre}
                </h3>

                <p>
                    ${barbero.especialidad}
                </p>

            </div>

        `;

        barberosContainer.appendChild(card);

    });
}

barberosContainer.addEventListener("click", (event) => {

    const card = event.target.closest(".barbero-card");

    if (!card) {
        return;
    }

    document
        .querySelectorAll(".barbero-card")
        .forEach(card => {
            card.classList.remove("seleccionado");
        });

    card.classList.add("seleccionado");

    const id = Number(card.dataset.id);

    barberoSeleccionado = barberos.find(
        barbero => barbero.id === id
    );

});



btnServicio.addEventListener("click", () => {

    if (!servicioSeleccionado) {
        return;
    }

    pasoServicio.style.display = "none";

    pasoBarbero.style.display = "block";

    actualizarProgreso(1);

});

continuarBarbero.addEventListener(
    "click",
    () => {

        if (!barberoSeleccionado) {

            return;

        }


        pasoBarbero.style.display =
            "none";

        pasoFecha.style.display =
            "block";

        actualizarProgreso(2);

    }
);

volverServicio.addEventListener("click", () => {

    pasoBarbero.style.display = "none";

    pasoServicio.style.display = "block";

    actualizarProgreso(0);

});


function mostrarCalendario() {

    calendarioDias.innerHTML = "";

    const año =
        fechaCalendario.getFullYear();

    const mes =
        fechaCalendario.getMonth();


    const nombreMes =
        fechaCalendario.toLocaleDateString(
            "es-AR",
            {
                month: "long",
                year: "numeric"
            }
        );


    mesActual.textContent =
        nombreMes;


    const primerDia =
        new Date(año, mes, 1);

    const ultimoDia =
        new Date(año, mes + 1, 0);


    let primerDiaSemana =
        primerDia.getDay();




    primerDiaSemana =
        primerDiaSemana === 0
            ? 6
            : primerDiaSemana - 1;


    

    for (
        let i = 0;
        i < primerDiaSemana;
        i++
    ) {

        const espacio =
            document.createElement("div");

        espacio.classList.add("dia-vacio");

        calendarioDias.appendChild(espacio);

    }


    

    for (
        let dia = 1;
        dia <= ultimoDia.getDate();
        dia++
    ) {

        const boton =
            document.createElement("button");

        boton.type = "button";

        boton.classList.add(
            "dia-calendario"
        );

        boton.textContent = dia;


        const fecha =
            new Date(año, mes, dia);


        const hoy =
            new Date();

        hoy.setHours(0, 0, 0, 0);



        const diaSemana = fecha.getDay();

        const esDiaPasado = fecha < hoy;

        const esDiaNoLaboral =
            !diasTrabajo.includes(diaSemana);


        if (esDiaPasado || esDiaNoLaboral) {

            boton.classList.add(
                "deshabilitado"
            );

            boton.disabled = true;

        }


        boton.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".dia-calendario"
                    )
                    .forEach(dia => {

                        dia.classList.remove(
                            "seleccionado"
                        );

                    });


                boton.classList.add(
                    "seleccionado"
                );


                fechaSeleccionada =
                    fecha;


                continuarFecha.disabled =
                    false;

            }
        );


        calendarioDias.appendChild(
            boton
        );

    }

}

mostrarCalendario();

continuarFecha.addEventListener(
    "click",
    () => {

        if (!fechaSeleccionada) {
            return;
        }


        pasoFecha.style.display = "none";

        pasoHorario.style.display = "block";


        mostrarHorarios();

        actualizarProgreso(3);


    }
);

mesAnterior.addEventListener(
    "click",
    () => {

        fechaCalendario.setMonth(
            fechaCalendario.getMonth() - 1
        );

        mostrarCalendario();

    }
);

mesSiguiente.addEventListener(
    "click",
    () => {

        fechaCalendario.setMonth(
            fechaCalendario.getMonth() + 1
        );

        mostrarCalendario();

    }
);

volverBarbero.addEventListener(
    "click",
    () => {

        pasoFecha.style.display =
            "none";

        pasoBarbero.style.display =
            "block";

        actualizarProgreso(1);
    }
);

function convertirHoraAMinutos(hora) {

    const [horas, minutos] =
        hora.split(":").map(Number);

    return horas * 60 + minutos;

}

function horarioSeSuperpone(
    horarioInicio,
    duracionNueva,
    horarioReserva,
    duracionReserva
) {

    const inicioNuevo =
        convertirHoraAMinutos(horarioInicio);

    const finNuevo =
        inicioNuevo + duracionNueva;


    const inicioReserva =
        convertirHoraAMinutos(horarioReserva);

    const finReserva =
        inicioReserva + duracionReserva;


    return (
        inicioNuevo < finReserva &&
        finNuevo > inicioReserva
    );

}



function mostrarHorarios() {

    horariosContainer.innerHTML = "";


    if (!fechaSeleccionada || !barberoSeleccionado || !servicioSeleccionado) {
        return;
    }


    const diaSemana =
        fechaSeleccionada.getDay();


    const esDiaNoLaboral =
        !diasTrabajo.includes(diaSemana);


    if (esDiaNoLaboral) {

        horariosContainer.innerHTML = `

            <div class="sin-horarios">

                <h3>
                    No hay atención este día
                </h3>

                <p>
                    Seleccioná otro día para continuar.
                </p>

            </div>

        `;

        continuarHorario.disabled = true;

        return;

    }


    continuarHorario.disabled = true;

    horarioSeleccionado = null;


    const reservasGuardadas =
        JSON.parse(
            localStorage.getItem("reservas")
        ) || [];


    const fechaSeleccionadaString =
        fechaSeleccionada
            .toISOString()
            .split("T")[0];


    const cierre =
        convertirHoraAMinutos(horaCierre);


    horariosDisponibles.forEach(horario => {

        const inicioHorario =
            convertirHoraAMinutos(horario);


        const finHorario =
            inicioHorario +
            servicioSeleccionado.duracion;


        // No mostrar horarios que terminen después del cierre

        if (finHorario > cierre) {

            return;

        }


        const boton =
            document.createElement("button");


        boton.type = "button";


        boton.classList.add(
            "horario-btn"
        );


        boton.textContent =
            horario;


        const horarioOcupado =
            reservasGuardadas.some(reserva => {

                const fechaReserva =
                    new Date(reserva.fecha)
                        .toISOString()
                        .split("T")[0];


                const mismoBarbero =
                    Number(reserva.barbero.id) ===
                    Number(barberoSeleccionado.id);


                const mismaFecha =
                    fechaReserva ===
                    fechaSeleccionadaString;


                if (!mismoBarbero || !mismaFecha) {

                    return false;

                }


                return horarioSeSuperpone(

                    horario,

                    servicioSeleccionado.duracion,

                    reserva.horario,

                    reserva.servicio.duracion

                );

            });


        if (horarioOcupado) {

            boton.disabled = true;

            boton.classList.add(
                "ocupado"
            );

            boton.textContent =
                `${horario} - Ocupado`;

        }


        boton.addEventListener(
            "click",
            () => {

                if (boton.disabled) {

                    return;

                }


                document
                    .querySelectorAll(
                        ".horario-btn"
                    )
                    .forEach(boton => {

                        boton.classList.remove(
                            "seleccionado"
                        );

                    });


                boton.classList.add(
                    "seleccionado"
                );


                horarioSeleccionado =
                    horario;


                continuarHorario.disabled =
                    false;

            }
        );


        horariosContainer.appendChild(
            boton
        );

    });

}

volverFecha.addEventListener(
    "click",
    () => {

        pasoHorario.style.display = "none";

        pasoFecha.style.display = "block";

        actualizarProgreso(2);

    }
);

continuarHorario.addEventListener(
    "click",
    () => {

        if (!horarioSeleccionado) {
            return;
        }


        pasoHorario.style.display = "none";

        pasoDatos.style.display = "block";

        actualizarProgreso(4);



    }
);

volverHorario.addEventListener(
    "click",
    () => {

        pasoDatos.style.display = "none";

        pasoHorario.style.display = "block";

        actualizarProgreso(3);

    }
);

formularioDatos.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const nombre =
            document.querySelector("#nombre").value;

        const telefono =
            document.querySelector("#telefono").value;

        const email =
            document.querySelector("#email").value;

        const comentario =
            document.querySelector("#comentario").value;


        resumenServicio.textContent =
            servicioSeleccionado.nombre;


        resumenBarbero.textContent =
            barberoSeleccionado.nombre;


        resumenFecha.textContent =
            fechaSeleccionada.toLocaleDateString(
                "es-AR"
            );


        resumenHorario.textContent =
            horarioSeleccionado;


        resumenNombre.textContent =
            nombre;


        resumenTelefono.textContent =
            telefono;


        resumenEmail.textContent =
            email;


        if (comentario.trim() !== "") {

            resumenComentario.textContent =
                comentario;

            resumenObservacionContainer.style.display =
                "block";

        } else {

            resumenObservacionContainer.style.display =
                "none";

        }


        pasoDatos.style.display =
            "none";

        pasoConfirmacion.style.display =
            "block";

    }
);

volverDatos.addEventListener(
    "click",
    () => {

        pasoConfirmacion.style.display =
            "none";

        pasoDatos.style.display =
            "block";

        actualizarProgreso(4);

    }
);

confirmarReserva.addEventListener(
    "click",
    () => {

        const nombre =
            document.querySelector("#nombre").value;

        const telefono =
            document.querySelector("#telefono").value;

        const email =
            document.querySelector("#email").value;

        const comentario =
            document.querySelector("#comentario").value;


        const codigo =
            generarCodigoReserva();


        const reserva = {

            id: codigo,

            servicio: {
                id: servicioSeleccionado.id,
                nombre: servicioSeleccionado.nombre,
                precio: servicioSeleccionado.precio,
                duracion: servicioSeleccionado.duracion
            },

            barbero: {
                id: barberoSeleccionado.id,
                nombre: barberoSeleccionado.nombre
            },

            fecha:
                fechaSeleccionada.toISOString(),

            horario:
                horarioSeleccionado,

            cliente: {

                nombre: nombre,

                telefono: telefono,

                email: email,

                comentario: comentario

            }

        };


        const reservasGuardadas =
            JSON.parse(
                localStorage.getItem("reservas")
            ) || [];


        reservasGuardadas.push(reserva);


        localStorage.setItem(
            "reservas",
            JSON.stringify(reservasGuardadas)
        );


        codigoReserva.textContent =
            codigo;


        finalServicio.textContent =
            servicioSeleccionado.nombre;


        finalBarbero.textContent =
            barberoSeleccionado.nombre;


        finalFecha.textContent =
            fechaSeleccionada.toLocaleDateString(
                "es-AR"
            );


        finalHorario.textContent =
            horarioSeleccionado;


        pasoConfirmacion.style.display =
            "none";

        reservaConfirmada.style.display =
            "block";


        console.log(
            "Reserva guardada:",
            reserva
        );

    }
);

function generarCodigoReserva() {

    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let codigo = "TU-";

    for (let i = 0; i < 5; i++) {

        const indice =
            Math.floor(
                Math.random() * caracteres.length
            );

        codigo += caracteres[indice];

    }

    return codigo;

}

nuevoTurno.addEventListener(
    "click",
    () => {

        location.reload();

    }
);

