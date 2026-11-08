/* =============================================
   GENERAR TABLA DE RUTAS
   ============================================= */

const tablaRutas = document.getElementById("tablaRutas");

if (tablaRutas) {
    RUTAS.forEach(ruta => {
        const fila = document.createElement("tr");

        [
            ruta.ruta,
            ruta.destino,
            ruta.anden,
            ruta.duracion,
            ruta.primSal,
            ruta.ultimSal
        ].forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        tablaRutas.appendChild(fila);
    });
}


/* =============================================
   GENERAR TARJETAS DE TARIFAS
   ============================================= */

const contenedorTarifas =
    document.getElementById("tarjetasTarifas");

if (contenedorTarifas) {
    TARIFAS.forEach(tarifa => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-tarifa");

        const nombre = document.createElement("h3");
        nombre.textContent = tarifa.nombre;

        const precio = document.createElement("p");
        precio.classList.add("precio-tarifa");
        precio.textContent = `Q${tarifa.precio.toFixed(2)}`;

        const descripcion = document.createElement("p");
        descripcion.classList.add("descripcion-tarjeta");
        descripcion.textContent = tarifa.descripcion;

        tarjeta.append(nombre, precio, descripcion);
        contenedorTarifas.appendChild(tarjeta);
    });
}


/* =============================================
   GENERAR SELECTOR DE RUTAS DEL REGISTRO
   ============================================= */

const selectorRuta = document.getElementById("ruta");

if (selectorRuta) {
    RUTAS.forEach(ruta => {
        const opcion = document.createElement("option");

        opcion.value = ruta.ruta;
        opcion.textContent = ruta.ruta;

        // Seleccionar inicialmente la Ruta 3.
        opcion.selected = ruta.ruta.startsWith("Ruta 3");

        selectorRuta.appendChild(opcion);
    });
}


/* =============================================
   GENERAR TARIFAS DEL REGISTRO
   ============================================= */

const contenedorOpcionesTarifa =
    document.getElementById("opcionesTarifas");

if (contenedorOpcionesTarifa) {
    TARIFAS.forEach((tarifa, indice) => {
        const etiqueta = document.createElement("label");
        etiqueta.classList.add("opcion-tarifa");

        const encabezado = document.createElement("span");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "tarifa";
        radio.value = String(tarifa.precio);
        radio.checked = indice === 0;
        radio.required = true;

        const nombre = document.createElement("strong");
        nombre.textContent =
            `${tarifa.nombre} · Q${tarifa.precio.toFixed(2)}`;

        encabezado.append(radio, nombre);

        const descripcion = document.createElement("small");
        descripcion.textContent = tarifa.descripcion;

        etiqueta.append(encabezado, descripcion);
        contenedorOpcionesTarifa.appendChild(etiqueta);
    });
}


/* =============================================
   NAVEGACIÓN ENTRE VISTAS
   ============================================= */

const botonMenu = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");

const enlacesMenu = document.querySelectorAll("#menuPrincipal a");

// Actualizar el panel cada vez que se acceda a su vista.
const enlacePanelAdmin = document.querySelector(
    '#menuPrincipal a[href="#administrador"]'
);

if (enlacePanelAdmin) {

    enlacePanelAdmin.addEventListener("click", () => {

        setTimeout(() => {

            if (panelAdministrador && !panelAdministrador.hidden) {
                actualizarPanelAdministrador();
            }

        }, 100);

    });

}

function cerrarMenu() {
    if (menuPrincipal) {
        menuPrincipal.classList.remove("abierto");
    }

    if (botonMenu) {
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );
    }
}


function mostrarVista(idVista) {
    const vistaElegida =
        document.getElementById(`vista-${idVista}`);

    if (!vistaElegida) {
        console.warn(
            `No se encontró la vista: vista-${idVista}`
        );
        return;
    }

    document.querySelectorAll("main .vista").forEach(vista => {
        vista.classList.toggle(
            "activa",
            vista === vistaElegida
        );
    });

    enlacesMenu.forEach(enlace => {
        enlace.classList.toggle(
            "activo",
            enlace.getAttribute("href") === `#${idVista}`
        );
    });

    cerrarMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.querySelectorAll('a[href="#tarifas"]').forEach(enlace => {
    enlace.addEventListener("click", function(evento) {
        evento.preventDefault();

        mostrarVista("inicio");

        setTimeout(() => {
            const seccionTarifas = document.getElementById("tarifas");

            if (seccionTarifas) {
                seccionTarifas.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                console.error("No se encontró la sección de tarifas.");
            }
        }, 150);
    });
});

// Navegación de los enlaces del menú.
enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", evento => {
        const href = enlace.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        const destino = href.substring(1);

        // Mostrar una vista si existe.
        if (
            document.getElementById(`vista-${destino}`)
        ) {
            evento.preventDefault();
            mostrarVista(destino);
            return;
        }

        // Ir a las tarifas de la página de Inicio.
        if (destino === "tarifas") {
            evento.preventDefault();
            mostrarVista("inicio");

            const seccionTarifas =
                document.getElementById("tarifas");

            if (seccionTarifas) {
                seccionTarifas.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }

        cerrarMenu();
    });
});


// Botones que llevan al registro.
document.querySelectorAll('a[href="#registro"]')
    .forEach(enlace => {
        enlace.addEventListener("click", evento => {
            if (
                document.getElementById("vista-registro")
            ) {
                evento.preventDefault();
                mostrarVista("registro");
            }
        });
    });


// Menú hamburguesa para teléfonos.
if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener("click", () => {
        const abierto =
            menuPrincipal.classList.toggle("abierto");

        botonMenu.setAttribute(
            "aria-expanded",
            String(abierto)
        );

        botonMenu.setAttribute(
            "aria-label",
            abierto
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );
    });
}


/* =============================================
   CÁLCULO DE LA TARIFA Y CANTIDAD DE PASAJEROS
   ============================================= */

const totalPagar = document.getElementById("totalPagar");
const formulario = document.getElementById("formRegistro");
const campoFecha = document.getElementById("fecha");
const campoCantidad = document.getElementById("cantidad");

const campoEdad = document.getElementById("edad");


// Obtener la tarifa seleccionada.
function obtenerTarifaSeleccionada() {

    const radioSeleccionado = document.querySelector(
        'input[name="tarifa"]:checked'
    );

    if (!radioSeleccionado) {
        return null;
    }

    const precio = Number(radioSeleccionado.value);

    return TARIFAS.find(tarifa => tarifa.precio === precio);
}

function validarTarifaPorEdad() {

    if (!campoEdad || !contenedorOpcionesTarifa) {
        return;
    }

    const edad = Number(campoEdad.value);

    const radios = contenedorOpcionesTarifa.querySelectorAll(
        'input[name="tarifa"]'
    );

    const mensaje = document.getElementById("mensajeTarifaEdad");

    radios.forEach(radio => {

        const tarifa = TARIFAS.find(
            elemento => elemento.precio === Number(radio.value)
        );

        let permitida = false;

        if (Number.isInteger(edad) && edad >= 4) {

            if (tarifa.nombre === "Niño") {
                permitida = edad >= 4 && edad <= 12;
            }

            if (tarifa.nombre === "Adulto") {
                permitida = edad >= 13 && edad <= 59;
            }

            if (tarifa.nombre === "Estudiante") {
                permitida = edad >= 13 && edad <= 29;
            }

            if (tarifa.nombre === "Adulto Mayor") {
                permitida = edad >= 60;
            }

        }

        radio.disabled = !permitida;

        if (!permitida && radio.checked) {
            radio.checked = false;
        }

        radio.closest(".opcion-tarifa").classList.toggle(
            "deshabilitada",
            !permitida
        );

    });

    const tarifaSeleccionada = obtenerTarifaSeleccionada();

    if (mensaje) {

        if (!Number.isInteger(edad) || edad < 4) {
            mensaje.textContent = "No hay una tarifa disponible para esta edad.";
        } else if (!tarifaSeleccionada) {
            mensaje.textContent = "Selecciona una tarifa válida para la edad indicada.";
        } else {
            mensaje.textContent = "";
        }

    }

    actualizarTarifa();

}

if (campoEdad) {

    campoEdad.addEventListener(
        "input",
        validarTarifaPorEdad
    );

}

// Calcular y mostrar el total.
function actualizarTarifa() {

    const tarifa = obtenerTarifaSeleccionada();

    const cantidad = campoCantidad
        ? Number(campoCantidad.value) || 1
        : 1;

    const precio = tarifa ? tarifa.precio : 0;
    
    const total = precio * cantidad;


    // Marcar visualmente la tarifa seleccionada.
    document.querySelectorAll(".opcion-tarifa").forEach(etiqueta => {

        const radio = etiqueta.querySelector(
            'input[name="tarifa"]'
        );

        etiqueta.classList.toggle(
            "seleccionada",
            Boolean(radio && radio.checked)
        );

    });


    // Mostrar el precio total.
    if (totalPagar) {
        totalPagar.textContent = `Q${total.toFixed(2)}`;
    }

}


// Detectar cambios en la tarifa.
if (contenedorOpcionesTarifa) {

    contenedorOpcionesTarifa.addEventListener(
        "change",
        actualizarTarifa
    );

}


// Detectar cambios en la cantidad de pasajeros.
if (campoCantidad) {

    campoCantidad.addEventListener(
        "input",
        actualizarTarifa
    );

}


// Restablecer el cálculo al limpiar el formulario.
if (formulario) {

    formulario.addEventListener("reset", () => {
        setTimeout(actualizarTarifa, 0);
    });

}

// Generar un código de boleto.
function generarCodigoBoleto() {

    const codigoAleatorio = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

    return `BUS-${codigoAleatorio}`;

}


// Convertir una fecha YYYY-MM-DD a formato local.
function formatearFecha(fecha) {

    if (!fecha) return "-";

    const partes = fecha.split("-");

    const fechaLocal = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

    return fechaLocal.toLocaleDateString("es-GT");

}


// Guardar un nuevo registro.
function guardarRegistro(registro) {
    return Almacenamiento.agregarRegistro(registro);
}

if (panelAdministrador && !panelAdministrador.hidden) {
    actualizarPanelAdministrador();
}


// Obtener el último registro.
function obtenerRegistro() {
    return Almacenamiento.obtenerUltimoRegistro();
}

// Mostrar los datos del registro en la vista Mis datos.
function mostrarDatosRegistro(registro) {

    const estado = document.getElementById("estadoRegistro");

    if (!registro) {

        if (estado) {
            estado.textContent = "Sin registro";
        }

        return;
    }


    document.getElementById("datoNombre").textContent =
        `${registro.nombres} ${registro.apellidos}`;

    document.getElementById("datoEdad").textContent =
        `${registro.edad} años`;

    document.getElementById("datoTelefono").textContent =
        registro.telefono;

    document.getElementById("datoCorreo").textContent =
        registro.correo;

    document.getElementById("datoTarifa").textContent =
        `${registro.tarifa} (Q${registro.precio.toFixed(2)})`;

    document.getElementById("datoRuta").textContent =
        registro.ruta;

    document.getElementById("datoFecha").textContent =
        formatearFecha(registro.fecha);

    document.getElementById("datoHora").textContent =
        registro.hora;

    document.getElementById("datoCantidad").textContent =
        `${registro.cantidad} pasajero(s)`;

    document.getElementById("datoTotal").textContent =
        `Q${registro.total.toFixed(2)}`;

    document.getElementById("datoCodigo").textContent =
        registro.codigo;

    document.getElementById("datoRegistro").textContent =
        new Date(registro.fechaRegistro).toLocaleString("es-GT");


    if (estado) {
        estado.textContent = "✓ Registro completado";
    }

}

/* =============================================
   PROCESAR EL REGISTRO
   ============================================= */

if (formulario) {

    formulario.addEventListener("submit", evento => {

        evento.preventDefault();

        // Comprobar que los campos sean válidos.
        if (!formulario.reportValidity()) {
            return;
        }

        

        const datos = new FormData(formulario);

        const tarifa = obtenerTarifaSeleccionada();

        if (!tarifa) {
            alert("Selecciona una tarifa.");
            return;
        }

        const cantidad = Number(datos.get("cantidad"));

        const total = tarifa.precio * cantidad;


        // Crear el objeto con los datos del viajero.
        const registro = {

            nombres: datos.get("nombres"),
            apellidos: datos.get("apellidos"),
            edad: Number(datos.get("edad")),
            telefono: datos.get("telefono"),
            correo: datos.get("correo"),

            tarifa: tarifa.nombre,
            precio: tarifa.precio,

            cantidad: cantidad,
            total: total,

            ruta: datos.get("ruta"),
            fecha: datos.get("fecha"),
            hora: datos.get("hora"),

            codigo: generarCodigoBoleto(),

            fechaRegistro: new Date().toISOString()

        };


        try {

            // Guardar los datos.
            guardarRegistro(registro);

            // Actualizar la vista Mis datos.
            mostrarDatosRegistro(registro);

            // Mostrar la vista Mis datos.
            mostrarVista("mis-datos");

        } catch (error) {

            console.error("Error al guardar el registro:", error);

            alert("No fue posible guardar el registro en este navegador.");

        }

    });

}


/* =============================================
   BOTÓN NUEVO REGISTRO
   ============================================= */

const botonNuevoRegistro = document.getElementById("nuevoRegistro");

if (botonNuevoRegistro) {

    botonNuevoRegistro.addEventListener("click", () => {

        if (formulario) {
            formulario.reset();
        }

        actualizarTarifa();

        mostrarVista("registro");

    });

}


/* =============================================
   RECUPERAR REGISTRO AL CARGAR LA PÁGINA
   ============================================= */

mostrarDatosRegistro(obtenerRegistro());

/* =============================================
   FECHA MÍNIMA: HOY
   ============================================= */

if (campoFecha) {
    const hoy = new Date();

    const fechaLocal = [
        hoy.getFullYear(),
        String(hoy.getMonth() + 1).padStart(2, "0"),
        String(hoy.getDate()).padStart(2, "0")
    ].join("-");

    campoFecha.min = fechaLocal;
}


// Mostrar el precio inicial.
actualizarTarifa();

/* =============================================
   GENERAR Y MOSTRAR BOLETO
   ============================================= */

// Calcular la hora de llegada utilizando la duración de la ruta.
function calcularHoraLlegada(horaSalida, duracion) {

    const [horas, minutos] = horaSalida.split(":").map(Number);

    // Obtener los minutos de duración.
    const minutosDuracion = parseInt(duracion, 10) || 0;

    // Sumar duración a la hora de salida.
    const totalMinutos = horas * 60 + minutos + minutosDuracion;

    const horasLlegada = Math.floor(totalMinutos / 60) % 24;
    const minutosLlegada = totalMinutos % 60;

    return (
        String(horasLlegada).padStart(2, "0") +
        ":" +
        String(minutosLlegada).padStart(2, "0")
    );

}


// Mostrar los datos del boleto.
function mostrarBoleto() {

    const registro = obtenerRegistro();

    const contenido = document.getElementById("boletoContenido");
    const mensajeVacio = document.getElementById("boletoSinRegistro");

    if (!contenido || !mensajeVacio) {
        return;
    }

    // Si no existe un registro, mostrar el mensaje correspondiente.
    if (!registro) {

        contenido.hidden = true;
        mensajeVacio.hidden = false;

        return;
    }

    contenido.hidden = false;
    mensajeVacio.hidden = true;


    // Buscar la información de la ruta seleccionada.
    const rutaSeleccionada = RUTAS.find(
        ruta => ruta.ruta === registro.ruta
    );

    const destino = rutaSeleccionada
        ? rutaSeleccionada.destino
        : "Destino no disponible";

    const anden = rutaSeleccionada
        ? rutaSeleccionada.anden
        : "-";

    const duracion = rutaSeleccionada
        ? rutaSeleccionada.duracion
        : "-";


    // Calcular hora de llegada.
    const horaLlegada = calcularHoraLlegada(
        registro.hora,
        duracion
    );


    // Colocar los datos en el boleto.
    document.getElementById("boletoSalida").textContent =
        registro.hora;

    document.getElementById("boletoLlegada").textContent =
        horaLlegada;

    document.getElementById("boletoDestino").textContent =
        destino;

    document.getElementById("boletoPasajero").textContent =
        `${registro.nombres} ${registro.apellidos}`;

    document.getElementById("boletoRuta").textContent =
        registro.ruta;

    document.getElementById("boletoFecha").textContent =
        formatearFecha(registro.fecha);

    document.getElementById("boletoAnden").textContent =
        anden;

    document.getElementById("boletoCantidad").textContent =
        `${registro.cantidad} pasajero(s)`;

    document.getElementById("boletoTarifa").textContent =
        `${registro.tarifa} · Q${registro.precio.toFixed(2)}`;

    document.getElementById("boletoDuracion").textContent =
        duracion;

    document.getElementById("boletoTotal").textContent =
        `Q${registro.total.toFixed(2)}`;

    document.getElementById("boletoCodigo").textContent =
        registro.codigo;

    document.getElementById("boletoCodigoLateral").textContent =
        registro.codigo;

    document.getElementById("boletoParadaFinal").textContent =
        destino;

}


// Actualizar el boleto cuando se selecciona la vista.
const enlaceBoleto = document.querySelector(
    '#menuPrincipal a[href="#boleto"]'
);

if (enlaceBoleto) {

    enlaceBoleto.addEventListener("click", () => {
        mostrarBoleto();
    });

}


// Botón "Acceder a mi boleto" desde Mis datos.
const botonAccederBoleto = document.getElementById("accederBoleto");

if (botonAccederBoleto) {

    botonAccederBoleto.addEventListener("click", () => {

        mostrarBoleto();
        mostrarVista("boleto");

    });

}


// Botón para realizar un registro desde la vista del boleto.
const botonRegistroBoleto = document.querySelector(
    '#boletoSinRegistro a[href="#registro"]'
);

if (botonRegistroBoleto) {

    botonRegistroBoleto.addEventListener("click", evento => {

        evento.preventDefault();
        mostrarVista("registro");

    });

}


// Recuperar el boleto al cargar la página.
mostrarBoleto();

/* =============================================
   IMPRIMIR BOLETO
   ============================================= */

const botonImprimir = document.getElementById("imprimirBoleto");

if (botonImprimir) {

    botonImprimir.addEventListener("click", () => {

        const registro = obtenerRegistro();

        if (!registro) {
            alert("No hay ningún boleto para imprimir.");
            return;
        }

        // Abrir el cuadro de impresión del navegador.
        window.print();

    });

}

/* =============================================
   ENCUESTA DE SATISFACCIÓN
   ============================================= */

// Elementos de la encuesta.
const formularioEncuesta = document.getElementById("formEncuesta");

const campoLimpieza = document.getElementById("calificacionLimpieza");
const valorLimpieza = document.getElementById("valorLimpieza");


// Actualizar el número del control deslizante.
if (campoLimpieza && valorLimpieza) {

    campoLimpieza.addEventListener("input", () => {
        valorLimpieza.textContent = campoLimpieza.value;
    });

}


// Botón para acceder a la encuesta desde el boleto.
const botonEvaluar = document.getElementById("evaluarExperiencia");

if (botonEvaluar) {

    botonEvaluar.addEventListener("click", () => {

        const registro = obtenerRegistro();

        if (!registro) {
            alert("Primero debes completar tu registro.");
            return;
        }

        mostrarVista("encuesta");

    });

}


// Calcular las puntuaciones.
function calcularResultadosEncuesta(datos) {

    const satisfaccion = Number(datos.get("satisfaccion"));
    const atencion = Number(datos.get("atencion"));

    const aspectos = datos.getAll("aspectos");

    // Cada aspecto seleccionado vale 2 puntos.
    // El máximo de esta pregunta es 10.
    const puntuacionAspectos = Math.min(aspectos.length * 2, 10);

    const limpieza = Number(datos.get("limpieza"));
    const facilidad = Number(datos.get("facilidad"));
    const recomendacion = Number(datos.get("recomendacion"));

    const puntuaciones = [
        satisfaccion,
        atencion,
        puntuacionAspectos,
        limpieza,
        facilidad,
        recomendacion
    ];

    const total = puntuaciones.reduce(
        (acumulado, puntuacion) => acumulado + puntuacion,
        0
    );

    const porcentaje = Math.round((total / 60) * 100);

    return {
        puntuaciones,
        aspectos,
        limpieza,
        total,
        porcentaje,
        frecuencia: datos.get("frecuencia"),
        comentarios: datos.get("comentarios")
    };

}


// Mostrar el resultado.
function mostrarResultadoEncuesta(resultado, registro) {

    const formulario = document.getElementById("formularioEncuesta");
    const resultadoContenedor = document.getElementById("resultadoEncuesta");

    formulario.hidden = true;
    resultadoContenedor.hidden = false;

    const aprobado = resultado.porcentaje >= 70;

    const mensaje = aprobado
        ? resultado.porcentaje >= 85
            ? "Muy buena experiencia"
            : "¡Experiencia satisfactoria!"
        : "Podemos mejorar";

    document.getElementById("mensajeResultado").textContent = mensaje;

    document.getElementById("porcentajeEncuesta").textContent =
        `${resultado.porcentaje}%`;

    document.getElementById("progresoEncuesta").style.width =
        `${resultado.porcentaje}%`;

    document.getElementById("descripcionResultado").textContent =
        aprobado
            ? "Nos alegra que su viaje haya sido satisfactorio. ¡Seguiremos mejorando!"
            : "Gracias por su opinión. Sus respuestas nos ayudarán a mejorar el servicio.";

    const preguntas = [
        "¿Qué tan satisfecho está con el servicio de la estación en general?",
        "¿Cómo calificaría la atención del personal?",
        "¿Qué aspectos le gustaron?",
        "Del 1 al 10, ¿qué tan limpia estaba la estación?",
        "¿Qué tan fácil fue registrarse y obtener su boleto?",
        "¿Recomendaría esta estación a otras personas?"
    ];

    const detalle = document.getElementById("detallePuntuaciones");

    detalle.innerHTML = "";

    resultado.puntuaciones.forEach((puntuacion, indice) => {

        const fila = document.createElement("div");
        fila.className = "fila-puntuacion";

        const pregunta = document.createElement("span");
        pregunta.textContent = preguntas[indice];

        const nota = document.createElement("strong");
        nota.textContent = `${puntuacion}/10`;

        fila.append(pregunta, nota);
        detalle.appendChild(fila);

    });


    document.getElementById("puntajeTotal").textContent =
        `Puntaje total: ${resultado.total} de 60 puntos`;


    // Mostrar u ocultar el diploma según el resultado.
    const diploma = document.getElementById("diploma");

    if (aprobado) {

        diploma.hidden = false;

        document.getElementById("nombreDiploma").textContent =
            `${registro.nombres} ${registro.apellidos}`;

        document.getElementById("textoDiploma").textContent =
            `Por completar su viaje en la ${registro.ruta} y aprobar la evaluación de satisfacción del servicio con un resultado de ${resultado.porcentaje}%.`;

        document.getElementById("fechaDiploma").textContent =
            `Guatemala, ${new Date().toLocaleDateString("es-GT")} · Boleto ${registro.codigo}`;

    } else {

        diploma.hidden = true;

    }

}


// Procesar el envío de la encuesta.
if (formularioEncuesta) {

    formularioEncuesta.addEventListener("submit", evento => {

        evento.preventDefault();

        if (!formularioEncuesta.reportValidity()) {
            return;
        }

        const registro = obtenerRegistro();

        if (!registro) {
            alert("No se encontró un registro de viaje.");
            return;
        }

        const datos = new FormData(formularioEncuesta);

        const resultado = calcularResultadosEncuesta(datos);

        const evaluacion = {
            ...resultado,
            codigoBoleto: registro.codigo,
            fechaEvaluacion: new Date().toISOString()
        };


        // Guardar la evaluación sin eliminar las anteriores.
        const guardado = Almacenamiento.agregarEncuesta(evaluacion);

        if (!guardado) {
            alert("No fue posible guardar la encuesta.");
            return;
        }

        // Actualizar el panel si está abierto.
        if (panelAdministrador && !panelAdministrador.hidden) {
            actualizarPanelAdministrador();
        }


        // Mostrar los resultados.
        mostrarResultadoEncuesta(resultado, registro);

    });

}


// Imprimir el diploma.
const botonImprimirDiploma = document.getElementById("imprimirDiploma");

if (botonImprimirDiploma) {

    botonImprimirDiploma.addEventListener("click", () => {

        const diploma = document.getElementById("diploma");

        if (!diploma || diploma.hidden) {
            alert("No hay un diploma disponible para imprimir.");
            return;
        }

        window.print();

    });

}


// Responder nuevamente.
const botonResponderEncuesta = document.getElementById("responderEncuesta");

if (botonResponderEncuesta) {

    botonResponderEncuesta.addEventListener("click", () => {

        formularioEncuesta.reset();

        if (valorLimpieza) {
            valorLimpieza.textContent = "5";
        }

        document.getElementById("formularioEncuesta").hidden = false;
        document.getElementById("resultadoEncuesta").hidden = true;

        document.getElementById("diploma").hidden = false;

    });

}


// Volver al inicio.
const botonVolverInicio = document.getElementById("volverInicio");

if (botonVolverInicio) {

    botonVolverInicio.addEventListener("click", () => {
        mostrarVista("inicio");
    });

}

/* =============================================
   PANEL DE ADMINISTRADOR
   ============================================= */

// Credenciales de acceso para la demostración.
const USUARIO_ADMIN = "admin";
const CLAVE_ADMIN = "2026";


// Elementos del acceso.
const formularioLoginAdmin = document.getElementById("formLoginAdmin");
const accesoAdministrador = document.getElementById("accesoAdministrador");
const panelAdministrador = document.getElementById("panelAdministrador");
const errorLoginAdmin = document.getElementById("errorLoginAdmin");


// Elementos del panel.
const botonCerrarSesion = document.getElementById("cerrarSesionAdmin");
const botonExportarCSV = document.getElementById("exportarCSV");
const botonVerBaseDatos = document.getElementById("verBaseDatos");
const botonBorrarDatos = document.getElementById("borrarDatos");

const mensajeBienvenidaAdmin = document.getElementById(
    "mensajeBienvenidaAdmin"
);

// Convertir un valor guardado en una lista.
// Esto permite trabajar con un objeto actual o con un arreglo futuro.
function obtenerListaAlmacenada(clave) {

    const contenido = localStorage.getItem(clave);

    if (!contenido) {
        return [];
    }

    try {

        const datos = JSON.parse(contenido);

        if (Array.isArray(datos)) {
            return datos;
        }

        return [datos];

    } catch (error) {

        console.error(`Error al leer ${clave}:`, error);
        return [];

    }

}


function obtenerDatosAdministrador() {

    return {
        viajeros: Almacenamiento.obtenerRegistros(),
        encuestas: Almacenamiento.obtenerEncuestas()
    };

}


// Iniciar sesión.
if (formularioLoginAdmin) {

    formularioLoginAdmin.addEventListener("submit", evento => {

        evento.preventDefault();

        const usuario = document.getElementById("usuarioAdmin").value.trim();
        const clave = document.getElementById("claveAdmin").value;

        if (usuario === USUARIO_ADMIN && clave === CLAVE_ADMIN) {

            accesoAdministrador.hidden = true;
            panelAdministrador.hidden = false;

            errorLoginAdmin.hidden = true;

            formularioLoginAdmin.reset();

            actualizarPanelAdministrador();
            if (mensajeBienvenidaAdmin) {
                mensajeBienvenidaAdmin.hidden = false;
            }

        } else {

            errorLoginAdmin.hidden = false;

        }

    });

}


// Cerrar sesión.
if (botonCerrarSesion) {

    botonCerrarSesion.addEventListener("click", () => {

        panelAdministrador.hidden = true;
        accesoAdministrador.hidden = false;

        document.getElementById("contenedorBaseDatos").hidden = true;

        formularioLoginAdmin.reset();
        if (mensajeBienvenidaAdmin) {
            mensajeBienvenidaAdmin.hidden = true;
        }

    });

}


// Actualizar las estadísticas y tablas.
function actualizarPanelAdministrador() {

    const datos = obtenerDatosAdministrador();

    const viajeros = datos.viajeros;
    const encuestas = datos.encuestas;

    // Estadísticas generales.
    document.getElementById("totalViajeros").textContent =
        viajeros.length;

    document.getElementById("totalEncuestas").textContent =
        encuestas.length;

    const promedio = encuestas.length > 0
        ? encuestas.reduce((suma, encuesta) => {
            return suma + Number(encuesta.porcentaje || 0);
        }, 0) / encuestas.length
        : 0;

    document.getElementById("satisfaccionPromedio").textContent =
        `${Math.round(promedio)}%`;

    const ingresos = viajeros.reduce((suma, viajero) => {
        return suma + Number(viajero.total || 0);
    }, 0);

    document.getElementById("ingresosEstimados").textContent =
        `Q${ingresos.toFixed(2)}`;


    mostrarViajerosAdmin(viajeros);
    mostrarEncuestasAdmin(encuestas);

    mostrarGraficoRutas(viajeros);
    mostrarGraficoEncuestas(encuestas);

}


// Mostrar los viajeros en la tabla.
function mostrarViajerosAdmin(viajeros) {

    const tabla = document.getElementById("tablaViajerosAdmin");

    tabla.innerHTML = "";

    if (viajeros.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="8">No hay viajeros registrados.</td>
            </tr>
        `;

        return;

    }

    viajeros.forEach((viajero, indice) => {

        const fila = document.createElement("tr");

        const valores = [
            viajero.codigo,
            `${viajero.nombres} ${viajero.apellidos}`,
            viajero.ruta,
            formatearFecha(viajero.fecha),
            viajero.hora,
            viajero.tarifa,
            `Q${Number(viajero.total).toFixed(2)}`
        ];

        valores.forEach(valor => {

            const celda = document.createElement("td");
            celda.textContent = valor ?? "-";
            fila.appendChild(celda);

        });

        const celdaAccion = document.createElement("td");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "boton-eliminar-fila";

        botonEliminar.addEventListener("click", () => {
            eliminarViajeroAdmin(indice);
        });

        celdaAccion.appendChild(botonEliminar);
        fila.appendChild(celdaAccion);

        tabla.appendChild(fila);

    });

}


// Mostrar las encuestas.
function mostrarEncuestasAdmin(encuestas) {

    const tabla = document.getElementById("tablaEncuestasAdmin");

    tabla.innerHTML = "";

    if (encuestas.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5">No hay encuestas recibidas.</td>
            </tr>
        `;

        return;

    }

    encuestas.forEach(encuesta => {

        const viajeros = obtenerListaAlmacenada("busUrbanoRegistro");

        const viajero = viajeros.find(
            registro => registro.codigo === encuesta.codigoBoleto
        );

        const nombre = viajero
            ? `${viajero.nombres} ${viajero.apellidos}`
            : "Viajero";

        const fecha = encuesta.fechaEvaluacion
            ? new Date(encuesta.fechaEvaluacion).toLocaleString("es-GT")
            : "-";

        const resultado = Number(encuesta.porcentaje) >= 85
            ? "Muy buena experiencia"
            : Number(encuesta.porcentaje) >= 70
                ? "Experiencia satisfactoria"
                : "Por mejorar";

        const comentario = encuesta.comentarios || "—";

        const valores = [
            fecha,
            nombre,
            `${encuesta.porcentaje || 0}%`,
            resultado,
            comentario
        ];

        const fila = document.createElement("tr");

        valores.forEach(valor => {

            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);

        });

        tabla.appendChild(fila);

    });

}


// Gráfico sencillo de viajeros por ruta.
function mostrarGraficoRutas(viajeros) {

    const contenedor = document.getElementById("graficoRutas");

    contenedor.innerHTML = "";

    RUTAS.forEach(ruta => {

        const cantidad = viajeros.filter(
            viajero => viajero.ruta === ruta.ruta
        ).length;

        const fila = document.createElement("div");
        fila.className = "fila-grafico";

        const nombre = document.createElement("span");
        nombre.textContent = ruta.ruta.split("·")[0].trim();

        const barra = document.createElement("div");
        barra.className = "barra-grafico";

        const progreso = document.createElement("div");
        progreso.className = "barra-progreso";
        progreso.style.width = viajeros.length > 0
            ? `${(cantidad / viajeros.length) * 100}%`
            : "0%";

        const numero = document.createElement("strong");
        numero.textContent = cantidad;

        barra.appendChild(progreso);

        fila.append(nombre, barra, numero);
        contenedor.appendChild(fila);

    });

}


// Gráfico de resultados de encuestas.
function mostrarGraficoEncuestas(encuestas) {

    const contenedor = document.getElementById("graficoEncuestas");

    contenedor.innerHTML = "";

    const categorias = [
        {nombre: "Excelente", minimo: 95},
        {nombre: "Muy buena experiencia", minimo: 85},
        {nombre: "Satisfactoria", minimo: 70},
        {nombre: "Por mejorar", minimo: 0}
    ];

    categorias.forEach((categoria, indice) => {

        let cantidad = 0;

        encuestas.forEach(encuesta => {

            const porcentaje = Number(encuesta.porcentaje || 0);

            if (indice === 0 && porcentaje >= 95) cantidad++;
            else if (indice === 1 && porcentaje >= 85 && porcentaje < 95) cantidad++;
            else if (indice === 2 && porcentaje >= 70 && porcentaje < 85) cantidad++;
            else if (indice === 3 && porcentaje < 70) cantidad++;

        });

        const fila = document.createElement("div");
        fila.className = "fila-grafico";

        const nombre = document.createElement("span");
        nombre.textContent = categoria.nombre;

        const barra = document.createElement("div");
        barra.className = "barra-grafico";

        const progreso = document.createElement("div");
        progreso.className = "barra-progreso";

        progreso.style.width = encuestas.length > 0
            ? `${(cantidad / encuestas.length) * 100}%`
            : "0%";

        const numero = document.createElement("strong");
        numero.textContent = cantidad;

        barra.appendChild(progreso);

        fila.append(nombre, barra, numero);
        contenedor.appendChild(fila);

    });

}


// Eliminar un viajero.
function eliminarViajeroAdmin(indice) {

    if (!confirm("¿Deseas eliminar este registro?")) {
        return;
    }

    const viajeros = Almacenamiento.obtenerRegistros();
    const viajero = viajeros[indice];

    if (!viajero) {
        return;
    }

    Almacenamiento.eliminarRegistro(viajero.codigo);

    actualizarPanelAdministrador();

}

// Ver los datos almacenados.
if (botonVerBaseDatos) {

    botonVerBaseDatos.addEventListener("click", () => {

        const contenedor = document.getElementById("contenedorBaseDatos");
        const contenido = document.getElementById("contenidoBaseDatos");

        const datos = {
            viajeros: obtenerListaAlmacenada("busUrbanoRegistro"),
            encuestas: obtenerListaAlmacenada("busUrbanoEncuesta")
        };

        contenido.textContent = JSON.stringify(datos, null, 4);

        contenedor.hidden = !contenedor.hidden;

    });

}


// Exportar viajeros a CSV.
if (botonExportarCSV) {

    botonExportarCSV.addEventListener("click", () => {

        const viajeros = obtenerListaAlmacenada("busUrbanoRegistro");

        if (viajeros.length === 0) {
            alert("No hay viajeros para exportar.");
            return;
        }

        const encabezados = [
            "Codigo",
            "Nombres",
            "Apellidos",
            "Edad",
            "Telefono",
            "Correo",
            "Tarifa",
            "Cantidad",
            "Total",
            "Ruta",
            "Fecha",
            "Hora"
        ];

        const filas = viajeros.map(v => [
            v.codigo,
            v.nombres,
            v.apellidos,
            v.edad,
            v.telefono,
            v.correo,
            v.tarifa,
            v.cantidad,
            v.total,
            v.ruta,
            v.fecha,
            v.hora
        ]);

        const csv = [
            encabezados,
            ...filas
        ].map(fila => fila.map(valor => {
            return `"${String(valor ?? "").replaceAll('"', '""')}"`;
        }).join(",")).join("\n");

        const archivo = new Blob(
            ["\uFEFF" + csv],
            {type: "text/csv;charset=utf-8;"}
        );

        const enlace = document.createElement("a");
        const url = URL.createObjectURL(archivo);

        enlace.href = url;
        enlace.download = "viajeros_bus_urbano.csv";
        enlace.click();

        URL.revokeObjectURL(url);

    });

}


// Borrar todos los datos.
if (botonBorrarDatos) {

    botonBorrarDatos.addEventListener("click", () => {

        const confirmar = confirm(
            "¿Borrar todos los viajeros y encuestas? Esta acción no se puede deshacer."
        );

        if (!confirmar) {
            return;
        }

        localStorage.removeItem("busUrbanoRegistro");
        localStorage.removeItem("busUrbanoEncuesta");

        actualizarPanelAdministrador();

        alert("Los datos han sido eliminados.");

    });

}