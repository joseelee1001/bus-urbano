
/* =============================================
   DATOS DEL PROYECTO BUS URBANO
   ============================================= */

// Información de las rutas disponibles.
const RUTAS = [
    {
        ruta: "Ruta 1 · Centro – Zona 18",
        destino: "Plaza Norte (Zona 18)",
        anden: "A1",
        duracion: "45 min",
        primSal: "05:00",
        ultimSal: "20:00"
    },
    {
        ruta: "Ruta 2 · Centro – Mixco",
        destino: "Centro de Mixco",
        anden: "A2",
        duracion: "40 min",
        primSal: "05:30",
        ultimSal: "20:30"
    },
    {
        ruta: "Ruta 3 · Centro – Villa Nueva",
        destino: "Terminal Villa Nueva",
        anden: "B1",
        duracion: "55 min",
        primSal: "05:00",
        ultimSal: "19:15"
    },
    {
        ruta: "Ruta 4 · Centro – Zona 10",
        destino: "Zona Viva (Zona 10)",
        anden: "B2",
        duracion: "25 min",
        primSal: "06:00",
        ultimSal: "21:00"
    },
    {
        ruta: "Ruta 5 · Centro – Aeropuerto",
        destino: "Aeropuerto La Aurora",
        anden: "C1",
        duracion: "30 min",
        primSal: "06:30",
        ultimSal: "22:00"
    },
    {
        ruta: "Ruta 6 · Centro – San Cristóbal",
        destino: "San Cristóbal (Mixco)",
        anden: "C2",
        duracion: "50 min",
        primSal: "05:00",
        ultimSal: "19:30"
    }
];

// Tarifas disponibles.
const TARIFAS = [
    {
        nombre: "Adulto",
        precio: 5,
        descripcion: "Pasajeros de 13 a 59 años."
    },
    {
        nombre: "Estudiante",
        precio: 3,
        descripcion: "Con carnet vigente (13 a 29 años)."
    },
    {
        nombre: "Adulto Mayor",
        precio: 2.5,
        descripcion: "Personas de 60 años en adelante."
    },
    {
        nombre: "Niño",
        precio: 2,
        descripcion: "Pasajeros de 4 a 12 años."
    }
];
