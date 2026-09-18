
/* ==========================================
   CREATION DISCO MÓVIL
   JAVASCRIPT
========================================== */


/* ==========================================
   SLIDER
========================================== */

let currentSlide = 0;

const slides =
    document.querySelectorAll(".slide");

const dots =
    document.querySelectorAll(".dot");


function showSlide(index) {

    if (index >= slides.length) {

        currentSlide = 0;

    }
    else if (index < 0) {

        currentSlide =
            slides.length - 1;

    }
    else {

        currentSlide = index;

    }


    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    dots.forEach(dot => {

        dot.classList.remove("active");

    });


    slides[currentSlide]
        .classList.add("active");


    dots[currentSlide]
        .classList.add("active");

}


function changeSlide(direction) {

    showSlide(
        currentSlide + direction
    );

}


function goToSlide(index) {

    showSlide(index);

}


setInterval(() => {

    changeSlide(1);

}, 5000);



/* ==========================================
   CALENDARIO
========================================== */


/*
    =========================================
    FECHAS OCUPADAS
    =========================================

    Para bloquear una fecha simplemente
    agrega la fecha en este formato:

    "AÑO-MES-DÍA"

    Ejemplo:

    "2026-10-10"

*/

const fechasOcupadas = [
   "2026-09-19",
   "2026-09-24", 
   "2026-10-10"   

];


/*
    Fecha que actualmente muestra
    el calendario.
*/

let fechaCalendario =
    new Date();


/*
    Nombres de los meses.
*/

const nombresMeses = [

    "Enero",

    "Febrero",

    "Marzo",

    "Abril",

    "Mayo",

    "Junio",

    "Julio",

    "Agosto",

    "Septiembre",

    "Octubre",

    "Noviembre",

    "Diciembre"

];


/*
    Generar calendario.
*/

function generarCalendario() {

    const calendario =
        document.getElementById("calendar");


    const titulo =
        document.getElementById("calendarTitle");


    if (!calendario || !titulo) {

        return;

    }


    calendario.innerHTML = "";


    const year =
        fechaCalendario.getFullYear();


    const month =
        fechaCalendario.getMonth();


    titulo.textContent =
        `${nombresMeses[month]} ${year}`;


    /*
        Primer día del mes.

        JavaScript:

        Domingo = 0
        Lunes = 1
        ...

        Lo convertimos para que
        la semana empiece en lunes.
    */

    let primerDia =
        new Date(
            year,
            month,
            1
        ).getDay();


    primerDia =
        primerDia === 0
            ? 6
            : primerDia - 1;


    /*
        Cantidad de días del mes.
    */

    const cantidadDias =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /*
        Espacios antes del primer día.
    */

    for (
        let i = 0;
        i < primerDia;
        i++
    ) {

        const espacio =
            document.createElement("div");


        espacio.className =
            "calendar-day empty";


        calendario.appendChild(
            espacio
        );

    }


    /*
        Crear los días.
    */

    for (
        let dia = 1;
        dia <= cantidadDias;
        dia++
    ) {

        const elemento =
            document.createElement("div");


        elemento.className =
            "calendar-day";


        elemento.textContent =
            dia;


        /*
            Fecha completa.
        */

        const fecha =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;


        /*
            Verificar si está ocupada.
        */

        if (
            fechasOcupadas.includes(fecha)
        ) {

            elemento.classList.add(
                "occupied"
            );

        }
        else {

            elemento.classList.add(
                "available"
            );

        }


        /*
            Marcar hoy.
        */

        const hoy =
            new Date();


        if (
            dia === hoy.getDate() &&
            month === hoy.getMonth() &&
            year === hoy.getFullYear()
        ) {

            elemento.classList.add(
                "today"
            );

        }


        calendario.appendChild(
            elemento
        );

    }

}


/*
    Mes anterior.
*/

function previousMonth() {

    fechaCalendario.setMonth(
        fechaCalendario.getMonth() - 1
    );

    generarCalendario();

}


/*
    Mes siguiente.
*/

function nextMonth() {

    fechaCalendario.setMonth(
        fechaCalendario.getMonth() + 1
    );

    generarCalendario();

}


/*
    Inicializar calendario.
*/

generarCalendario();


