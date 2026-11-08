
/* =============================================
   ALMACENAMIENTO DEL PROYECTO BUS URBANO
   ============================================= */

const Almacenamiento = (() => {

    // Claves utilizadas en localStorage.
    const CLAVE_REGISTROS = "busUrbanoRegistro";
    const CLAVE_ENCUESTAS = "busUrbanoEncuesta";


    /* =============================================
       FUNCIONES GENERALES
       ============================================= */

    // Leer una lista almacenada.
    function leerLista(clave) {

        const contenido = localStorage.getItem(clave);

        if (!contenido) {
            return [];
        }

        try {

            const datos = JSON.parse(contenido);

            // Si ya es un arreglo, devolverlo.
            if (Array.isArray(datos)) {
                return datos;
            }

            // Si es un objeto antiguo, convertirlo en arreglo.
            if (datos && typeof datos === "object") {

                const lista = [datos];

                // Actualizar el formato en localStorage.
                guardarLista(clave, lista);

                return lista;

            }

            return [];

        } catch (error) {

            console.error(
                `Error al leer los datos de ${clave}:`,
                error
            );

            return [];

        }

    }


    // Guardar una lista completa.
    function guardarLista(clave, lista) {

        try {

            localStorage.setItem(
                clave,
                JSON.stringify(lista)
            );

            return true;

        } catch (error) {

            console.error(
                `Error al guardar los datos de ${clave}:`,
                error
            );

            return false;

        }

    }


    /* =============================================
       REGISTROS DE VIAJEROS
       ============================================= */

    // Obtener todos los registros.
    function obtenerRegistros() {

        return leerLista(CLAVE_REGISTROS);

    }


    // Obtener el último registro realizado.
    function obtenerUltimoRegistro() {

        const registros = obtenerRegistros();

        if (registros.length === 0) {
            return null;
        }

        return registros[registros.length - 1];

    }


    // Buscar un registro mediante su código de boleto.
    function buscarRegistro(codigo) {

        const registros = obtenerRegistros();

        return registros.find(
            registro => registro.codigo === codigo
        ) || null;

    }


    // Agregar un nuevo registro sin eliminar los anteriores.
    function agregarRegistro(registro) {

        const registros = obtenerRegistros();

        registros.push(registro);

        return guardarLista(
            CLAVE_REGISTROS,
            registros
        );

    }


    // Eliminar un registro específico.
    function eliminarRegistro(codigo) {

        const registros = obtenerRegistros();

        const registrosActualizados = registros.filter(
            registro => registro.codigo !== codigo
        );

        return guardarLista(
            CLAVE_REGISTROS,
            registrosActualizados
        );

    }


    /* =============================================
       ENCUESTAS DE SATISFACCIÓN
       ============================================= */

    // Obtener todas las encuestas.
    function obtenerEncuestas() {

        return leerLista(CLAVE_ENCUESTAS);

    }


    // Buscar una encuesta mediante el código del boleto.
    function buscarEncuesta(codigo) {

        const encuestas = obtenerEncuestas();

        return encuestas.find(
            encuesta => encuesta.codigoBoleto === codigo
        ) || null;

    }


    // Agregar una nueva encuesta.
    function agregarEncuesta(encuesta) {

        const encuestas = obtenerEncuestas();

        encuestas.push(encuesta);

        return guardarLista(
            CLAVE_ENCUESTAS,
            encuestas
        );

    }


    /* =============================================
       ELIMINAR TODOS LOS DATOS
       ============================================= */

    function eliminarTodosLosDatos() {

        try {

            localStorage.removeItem(CLAVE_REGISTROS);
            localStorage.removeItem(CLAVE_ENCUESTAS);

            return true;

        } catch (error) {

            console.error(
                "Error al eliminar los datos:",
                error
            );

            return false;

        }

    }


    // Funciones disponibles para el resto del proyecto.
    return {

        obtenerRegistros,
        obtenerUltimoRegistro,
        buscarRegistro,
        agregarRegistro,
        eliminarRegistro,

        obtenerEncuestas,
        buscarEncuesta,
        agregarEncuesta,

        eliminarTodosLosDatos

    };

})();
